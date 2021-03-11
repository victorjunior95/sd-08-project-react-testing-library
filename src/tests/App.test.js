import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderService from '../services/renderService';

describe('App component testing ', () => {
  it('Checks whether to render a reading with the text Pokédex', () => {
    const { getByText } = renderService(<App />);
    const principal = getByText(/Pokédex/i);
    expect(principal).toBeInTheDocument();
  });
  it('Checks for navigation links', () => {
    const { getByRole } = renderService(<App />);
    const homeLink = getByRole('link', { name: 'Home' });
    const aboutLink = getByRole('link', { name: 'About' });
    const favoritePokemon = getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });
  it('Checks whether you are redirected to Home', () => {
    const { getByRole, historyOfPokemons } = renderService(<App />);
    const homeLink = getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const { pathname } = historyOfPokemons.location;
    expect(pathname).toBe('/');
  });
  it('Checks whether you are redirected to About', () => {
    const { getByRole, historyOfPokemons } = renderService(<App />);

    const aboutLink = getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = historyOfPokemons.location;
    expect(pathname).toBe('/about');
  });

  it('Checks whether you are redirected to Favorite Pokemon', () => {
    const { getByRole, historyOfPokemons } = renderService(<App />);
    const favoritePokemon = getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemon);
    const { pathname } = historyOfPokemons.location;
    expect(pathname).toBe('/favorites');
  });
  it('Checks whether it is redirected to Not Found when accessing unknown URL',
    () => {
      const { getByText, historyOfPokemons } = renderService(<App />);
      historyOfPokemons.push('/trybe');
      const unMatch = getByText('Page requested not found');
      expect(unMatch).toBeInTheDocument();
    });
});
