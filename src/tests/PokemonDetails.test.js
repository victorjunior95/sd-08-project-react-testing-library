import React from 'react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { PokemonDetails } from '../components';

describe('test PokemonDetails component', () => {
  test('renders a heading level 2 with text', () => {
    const match = { params: { id: pokemons[0].id } };
    const { getAllByRole, getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
    />);
    const gameLocation = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(gameLocation).toBeInTheDocument();
  });

  test('renders image(s) with the location', () => {
    const match = { params: { id: pokemons[0].id } };
    const { getByRole, getAllByAltText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
    />);
    const locationImage = getAllByAltText(`${pokemons[0].name} location`);
    locationImage.forEach((image, index) => {
      expect(image.src).toBe(pokemons[0].foundAt[index].map);
      expect(image.alt).toBe(`${pokemons[0].name} location`);
    });
  });
});
