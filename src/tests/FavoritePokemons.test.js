import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('teste requisito 3# ', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found ', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const getTextNotFound = getByText(/No favorite pokemon found/i);
    expect(getTextNotFound).toBeInTheDocument();
  });
  it('teste se todos os cards pokemon favoritos aparecem', () => {
  });
});
