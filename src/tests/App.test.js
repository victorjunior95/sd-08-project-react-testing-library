import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('O primeiro link deve possuir o texto Home', () => {
  test('teste Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });

    userEvent.click(homeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
});

describe('O segundo link deve possuir o texto About', () => {
  test('teste About', () => {
    const { history } = renderWithRouter(<App />);

    const AboutLink = screen.getByRole('link', {
      name: /About/i,
    });

    userEvent.click(AboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
});

describe('O terceiro link deve possuir o texto Favorite Pokémons', () => {
  test('teste Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(favoritePokemonLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
