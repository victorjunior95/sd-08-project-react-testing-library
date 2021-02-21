// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 3, FavoritePokemons.js', () => {
  test('"No favorite pokemon found" should be rendered', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  test('Some cards should be rendered', () => {
    const favoritePokemons = [
      {
        averageWeight: { value: '6.0', measurementUnit: 'kg' },
        foundAt: [
          { location: 'Kanto Viridian Forest', map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' },
          { location: 'Kanto Power Plant', map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' },
        ],
        id: 25,
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        name: 'Pikachu',
        // summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
        type: 'Electric',
      },
      {
        averageWeight: { value: '6.9', measurementUnit: 'kg' },
        foundAt: [
          { location: 'Goldenrod Game Corner', map: 'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png' },
        ],
        id: 23,
        image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
        name: 'Ekans',
        // summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
        type: 'Poison',
      },
    ];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Ekans')).toBeInTheDocument();
  });
});
