import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('REQUISITO 3', () => {
  it('É exibido na "No favorite pokemon found", se a pessoa não tiver pokémons favoritos',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
      const text = getByText('No favorite pokemon found');
      expect(text).toBeInTheDocument();
    });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const testId = getAllByTestId('pokemon-name');
    expect(testId.length).toBe(pokemons.length);
  });

  it('Nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const noPoke = queryAllByTestId('pokemon-name');
    expect(noPoke.length).toBe(0);
  });
});
