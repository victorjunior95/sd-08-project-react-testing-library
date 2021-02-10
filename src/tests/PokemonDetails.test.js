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
      // onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
      //   this.onUpdateFavoritePokemons(pokemonId, isFavorite)
      // ) }
    />);
    const gameLocation = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(gameLocation).toBeInTheDocument();
  });
});
