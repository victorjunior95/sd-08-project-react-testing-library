import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const FavoritePokemons = 'Favorite Pokémons';

describe('App.js', () => {
  test('should show the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('should show the header navigation Links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const navigationLinks = getAllByRole('link');

    expect(navigationLinks[0]).toHaveTextContent('Home');
    expect(navigationLinks[1]).toHaveTextContent('About');
    expect(navigationLinks[2]).toHaveTextContent(FavoritePokemons);
  });

  test('should redirect to `/` when Home Navigation Link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('should redirect to `/about` when About Navigation Link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('should redirect to `/favorites` when Favorite PokémonsNavLink is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemonLink = getByText(FavoritePokemons);

    userEvent.click(favoritePokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('should redirect to Not Found Page when invalid url is typed', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/wrong-url';
    history.push(route);
    const pageNotFound = getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
