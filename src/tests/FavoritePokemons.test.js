import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('FavoritePokemons', () => {
  test('if the message "No favorite pokemon found" is displayed on the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
});
