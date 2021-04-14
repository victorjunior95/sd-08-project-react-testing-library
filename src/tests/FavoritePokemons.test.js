import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testes no componente Favorite Pokemons', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const pokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' },
    ];

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
