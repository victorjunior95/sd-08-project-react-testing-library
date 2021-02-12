import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

test('Verifica se é exibido a mensagem No favorite pokemon found na tela', () => {
  const { getByText } = renderWithRouter(<FavoritePokemon />);
  const message = 'No favorite pokemon found';
  expect(getByText(message)).toBeInTheDocument();
});

test('Verifica se é exibido todos os cards dos pokémons favoritados', () => {
  const mockPokemons = [{
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
  },
  ];
  renderWithRouter(<FavoritePokemon pokemons={ mockPokemons } />);
  const name = screen.getByText('Caterpie');
  const type = screen.getByText('Bug');
  const averageWeight = screen.getByText(/2.9 kg/);

  expect(name).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(averageWeight).toBeInTheDocument();
});

test('Verifica se nenhum card de pokémon é exibido caso não estiver favoritado', () => {
  const { container } = renderWithRouter(<FavoritePokemon pokemons={ [] } />);
  const card = container.querySelector('.favorite-pokemons');
  expect(card).toBeNull();
});
