import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('tests for FavoritePokemons.js', () => {
  it('shows the title `Favorite pokémons`', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemons />);
    const title = getByRole('heading', { level: 2, name: 'Favorite pokémons' });
    expect(title).toBeInTheDocument();
  });

  it('shows not found favorite pokemons message correctly', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
});
