import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

test('verifica pagina de pokemons favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const favoriteList = getByText(/No favorite pokemon found/i);
  expect(favoriteList).toBeInTheDocument();
});
