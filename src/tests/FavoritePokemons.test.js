import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('1- Caso não exista pokemons favoritados.', () => {
  it('A página deve renderizar a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const heading = getByText(/No favorite pokemon found/i);
    expect(heading).toBeInTheDocument();
  });
});
