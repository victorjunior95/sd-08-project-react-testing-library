import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const pokemon = [{
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
  summary: 'This intelligent Pokémon roasts hard berries with'
  + 'electricity to make them tender enough to eat.',
}];

describe('test FavoritePokemons.js', () => {
  it('test No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const pokemonFoundText = screen.getByText('No favorite pokemon found');

    expect(pokemonFoundText).toBeInTheDocument();
  });

  it('cards pokemon favorite', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);

    const pokemonFavorite = screen.getByText(/pikachu/i);

    expect(pokemonFavorite).toBeInTheDocument();
  });

  it('cards pokemon not favorite', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});
