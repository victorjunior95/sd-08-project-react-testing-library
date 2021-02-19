import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const noFavorites = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = false;
  return acc;
}, {});

const POKEMON_NAME = 'pokemon-name';
const NEXT_POKEMON = 'next-pokemon';

describe('Pokedex page', () => {
  it('should have a h2 with the text `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ noFavorites } />,
    );
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2.textContent).toBe('Encountered pokémons');
  });
  it('should display the next pokémon'
  + ' when the button `Próximo pokémon` is pressed', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ noFavorites } />,
    );
    const nextPokemon = getByTestId(NEXT_POKEMON);
    expect(nextPokemon.textContent).toBe('Próximo pokémon');
    const pokemonCard = getByTestId(POKEMON_NAME);
    for (let index = 0; index <= pokemons.length; index += 1) {
      const previousPokemon = pokemonCard.textContent;
      fireEvent.click(nextPokemon);
      const currentPokemon = pokemonCard.textContent;
      expect(currentPokemon).not.toBe(previousPokemon);
    }
  });
  it('should display one pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ noFavorites } />,
    );
    const pokemon = getAllByTestId(POKEMON_NAME);
    expect(pokemon.length).toBe(1);
  });
  it('should have buttons to filter the types', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ noFavorites } />,
    );
    const types = getAllByTestId('pokemon-type-button');
    fireEvent.click(types[1]);
    const currentPokemonType = getByTestId('pokemonType');
    expect(types[1].textContent).toBe(currentPokemonType.textContent);
    const nextPokemon = getByTestId(NEXT_POKEMON);
    fireEvent.click(nextPokemon);
    expect(types[1].textContent).toBe(currentPokemonType.textContent);
  });
  it('should have a button to reset the filter', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ noFavorites } />,
    );
    const resetButton = getAllByRole('button')[0];
    expect(resetButton.textContent).toBe('All');
    fireEvent.click(resetButton);
    const pokemon = getByTestId(POKEMON_NAME);
    expect(pokemon.textContent).toBe('Pikachu');
  });
  it('should disable the next pokemon button', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ noFavorites } />,
    );
    const electricType = getAllByTestId('pokemon-type-button')[0];
    fireEvent.click(electricType);
    const nextPokemon = getByTestId(NEXT_POKEMON);
    expect(nextPokemon).toHaveAttribute('disabled');
  });
});
