import React from 'react';
import FavoritesPokemon from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa Component Favorites Pokemons', () => {
  test('Se é exibido na tela a msg: Nenhum Pokemon favorito foi encontrado.',
    () => {
      const { getByText } = renderWithRouter(
        <FavoritesPokemon />,
      );
      const msg = getByText('No favorite pokemon found');
      expect(msg).toBeInTheDocument();
    });
});
