import React from 'react';
import renderWithRouter from '../renderWithRouter'; 

import FavoritePokemons from '../components/FavoritePokemons';

describe('Test component FavoritePokemons', () => {
  it('should have the message "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteFound = getByText('No favorite pokemon found');
    expect(noFavoriteFound).toBeInTheDocument();
  });
});
