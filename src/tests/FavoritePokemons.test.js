import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

import App from '../App';

describe('Test', () => {
  it(`
    'No favorite pokemon found', se não houver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('Testa se são exibido todos os cards de pokémons favoritos.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/i));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', {
      name: /home/i,
    }));
    userEvent.click(screen.getByTestId('next-pokemon'));
    userEvent.click(screen.getByText(/More details/i));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    }));
    expect(screen.getAllByTestId('pokemon-name').length).toBe(2);
  });
});
