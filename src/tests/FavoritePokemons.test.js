import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemon /> ', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});
