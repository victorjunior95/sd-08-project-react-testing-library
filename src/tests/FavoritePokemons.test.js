import React from 'react';
// import {  } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('Testa página de pokemons favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const noPoks = getByText('No favorite pokemon found');

  expect(noPoks).toBeInTheDocument();
});
