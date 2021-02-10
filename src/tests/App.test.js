import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });

    userEvent.click(homeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);

    const AboutLink = screen.getByRole('link', {
      name: /About/i,
    });

    userEvent.click(AboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(favoritePokemonLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
