import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Favorite pokemons card', () => {
  it('', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
});
