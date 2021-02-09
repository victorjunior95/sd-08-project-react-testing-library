import React from 'react';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Exibe "No favorite pokemon found" se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavoriteMessage = getByText('No favorite pokemon found');
    expect(noFavoriteMessage).toBeInTheDocument();
  });

  it('Exibe todos os cards de pokémons favoritados', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    const allPokemons = getAllByTestId('pokemon-name');
    expect(allPokemons.length).toBe(pokemons.length);
  });

  it('Nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    const allPokemons = queryAllByTestId('pokemon-name');
    expect(allPokemons.length).toBe(0);
  });
});
