import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../components';

test('A página deve renderizar a mensagem "No favorite pokemon found"', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);

  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});
