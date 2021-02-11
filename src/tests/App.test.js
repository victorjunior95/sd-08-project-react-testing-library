import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testing routes', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('menu contains: "Home", "About", "Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);

    const menuHome = getByText('/Home/i');
    expect(menuHome).toBeInTheDocument();

    const menuAbout = getByText('/About/i');
    expect(menuAbout).toBeInTheDocument();

    const menuFavoritePokemons = getByText('/Favorite Pokémons/i');
    expect(menuFavoritePokemons).toBeInTheDocument();
  });

  test('is redirect to Home page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const menuHome = getByText(/Home/i);
    expect(menuHome).toBeInTheDocument();

    userEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('is redirect to About page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle).toBeInTheDocument();

    const menuAbout = getByText(/About/i);
    expect(menuAbout).toBeInTheDocument();

    userEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const about = getByText(/About Pokémons/i);
    expect(about).toBeInTheDocument();
  });

  test('is redirect to Favorite Pokémons page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle).toBeInTheDocument();

    const menuFavoritePokemons = getByText(/Favorite pokémons/i);
    expect(menuFavoritePokemons).toBeInTheDocument();

    userEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favorite = getByText(/No favorite pokémon found/i);
    expect(favorite).toBeInTheDocument();
  });

  test('is redirect to Not Found Page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle).toBeInTheDocument();

    const routeNotFound = '/pokemon';
    history.push(routeNotFound);

    const pageNotFound = getByText(/Page request not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
