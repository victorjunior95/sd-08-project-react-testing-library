import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('tests the component FavoritePokemons.js', () => {
  it('shows a message on the screen if there is no favorited pokémons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });
});
