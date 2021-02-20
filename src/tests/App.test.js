import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('there are links on the page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: 'Home',
    });
    const linkAbout = getByRole('link', {
      name: 'About',
    });
    const linkFavoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
  test('must be redirected to the link Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkHome = getByRole('link', {
      name: 'Home',
    });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('must be redirected to the link About', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkAbout = getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('must be redirected to the link Favorite Pokémons', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkFavoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  test('should be directed to the Not Found page when entering an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/trybe');
    const noMatch = getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
