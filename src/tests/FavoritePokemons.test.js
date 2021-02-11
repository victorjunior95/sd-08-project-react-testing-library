import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 03', () => {
  it('Teste 01 - É exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon />);
    const message = 'No favorite pokemon found';
    expect(getByText(message)).toBeInTheDocument();
  });

  it('Teste 02 - É exibido todos os cards de pokémons favoritados', () => {
    const pokemonsMock = [{
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
    },
    ];

    renderWithRouter(<FavoritePokemon pokemons={ pokemonsMock } />);
    const name = screen.getByText('Charmander');
    const type = screen.getByText('Fire');
    const averageWeight = screen.getByText(/8.5 kg/);

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
  });

  it('Teste 03 - Nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { container } = renderWithRouter(<FavoritePokemon pokemons={ [] } />);
    const card = container.querySelector('.favorite-pokemons');
    expect(card).toBeNull();
  });
});
