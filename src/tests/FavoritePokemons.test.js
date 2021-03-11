import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('No Favorite', () => {
  it('Not Found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
});
