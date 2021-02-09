import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

test('renders the page FavoriteProkemons after click on link `Favorite Pokémons`', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const favoritePokemons = getByText('No favorite pokemon found');
  expect(favoritePokemons).toBeInTheDocument();
});
