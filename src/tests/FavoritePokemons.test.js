import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Req 03', () => {
  test(' No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const mensagem = 'No favorite pokemon found';
    expect(getByText(mensagem)).toBeInTheDocument();
  });
});
