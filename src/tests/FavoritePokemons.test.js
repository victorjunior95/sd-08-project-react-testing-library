import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('REQUISITO 3', () => {
  it('É exibido na "No favorite pokemon found", se a pessoa não tiver pokémons favoritos',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      const text = getByText('No favorite pokemon found');
      expect(text).toBeInTheDocument();
    });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {

  });
});
