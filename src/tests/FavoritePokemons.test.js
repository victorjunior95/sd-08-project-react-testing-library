import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3 - Teste o componente \\"FavoritePokemons"\\ ', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByText } = render(<FavoritePokemons pokemons={ [] } />);
    const noFavorite = getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    expect(queryByText('Caterpie')).not.toBeInTheDocument();
    expect(queryByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('Charmander')).toBeInTheDocument();
  });
});
