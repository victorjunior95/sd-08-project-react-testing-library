import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Req03 Teste Pokemons Favoritos', () => {
  test('Teste sem Pokemon fav, se exibe a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
