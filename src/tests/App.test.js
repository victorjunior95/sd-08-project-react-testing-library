import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';

import App from '../App';

const favoriteLink = 'Favorite Pokémons';

describe('App.js', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('shows the header nav links', () => {
    const { getAllByRole } = renderWithRouter(<App />);

    const navLinks = getAllByRole('link');
    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[1]).toHaveTextContent('About');
    expect(navLinks[2]).toHaveTextContent(favoriteLink);
  });

  it('redirects to `/` when Home link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const homeLink = getByText('Home');
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('redirects to `/about` when About link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const aboutLink = getByText('About');
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('redirects to `/favorites` when Favorite Pokémons link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favoritePokemonLink = getByText(favoriteLink);
    userEvent.click(favoritePokemonLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('redirects to Not Found page when invalid url is typed', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const route = '/wrong-url';
    history.push(route);

    const pageNotFound = getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
