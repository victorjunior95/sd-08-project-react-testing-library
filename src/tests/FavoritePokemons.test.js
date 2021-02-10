import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

const pokemon = [{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
  summary: 'The flame on its tail shows the strength'
     + 'of its life force. If it is weak, the flame also burns weakly.',
}];

describe('Teste o componente `<FavoritePokemons.js />`', () => {
  test('é exibido `No favorite pokemon found`, se a pessoa não tiver pokémons favoritos.',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      const selectText = 'No favorite pokemon found';
      expect(getByText(selectText)).toBeInTheDocument();
    });
  test('se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const favoritePokemons = getByText(/Charmander/i);
    expect(favoritePokemons).toBeInTheDocument();
  });
  test(' se **nenhum** card de pokémon é exibido, se ele não estiver favoritado', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});
