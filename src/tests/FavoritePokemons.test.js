import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

test('renders empty page `Favorite Pokémons` with `No favorite pokemon found`', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const favoritePokemons = getByText('No favorite pokemon found');
  expect(favoritePokemons).toBeInTheDocument();
});
