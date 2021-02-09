import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Favorite Pokémons page', () => {
  it('Should contain text "No favorite pokémon found" if no favorite pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noFavoritePokemonText = getByText('No favorite pokemon found');

    expect(noFavoritePokemonText).toBeInTheDocument();
  });

  it('Should render favorite pokemons cards', () => {
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
    ];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonName = getByText('Pikachu');
    const pokemonType = getByText('Electric');
    const pokemonAvgWgt = getByText(/6.0 kg/i);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonAvgWgt).toBeInTheDocument();
  });
});
