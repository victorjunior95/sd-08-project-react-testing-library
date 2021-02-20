import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('FavoritePokemons.js', () => {
  test('Testa se é exibido a mensagem no favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noPokemonMsg = getByText(/No favorite pokemon found/i);
    expect(noPokemonMsg).toBeInTheDocument();
  });
});
