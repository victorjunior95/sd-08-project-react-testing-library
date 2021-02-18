import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('checks if the favorite pokemons page loads correctly', () => {
  test('No Favorite Pokemon found message if the user didnt add any favorites', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorites = getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });
});
