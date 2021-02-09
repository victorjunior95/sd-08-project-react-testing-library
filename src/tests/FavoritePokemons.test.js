import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../services/renderWithRouter';

describe('Testing component FavoritePokemons.js', () => {
  test('It must show up a message if there is no favorited pokémon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteMessage = 'No favorite pokemon found';
    expect(getByText(noFavoriteMessage)).toBeInTheDocument();
  });
});
