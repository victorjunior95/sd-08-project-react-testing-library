import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/route/renderWithRouter';
import pokemons from '../data';

describe('requirement 03', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
      se a pessoa não tiver pokémons favoritos`, () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});