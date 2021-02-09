import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

const mockPokemon = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts ... to make them tender enough to eat.',
  },
];

describe('FavoritePokemons.js', () => {
  test('Teste no favorite pokemon found se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByRole('heading', { level: 2 });
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ mockPokemon } />);
    const card = getByText(/Pikachu/i);
    expect(card).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { container } = renderWithRouter(<FavoritePokemons />);
    const [p] = container.getElementsByTagName('p');
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(/No favorite Pokemon Found/i);
  });
});
