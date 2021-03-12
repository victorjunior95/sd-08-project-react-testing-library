import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import pokemons from '../data';

describe('Test component Pokedex, refactoring', () => {
  const TESTID_NEXT_POKEMON = 'next-pokemon';
  const TESTID_POKEMON_NAME = 'pokemon-name';
  const TESTID_POKEMON_TYPE_BUTTON = 'pokemon-type-button';

  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('should have an h2 tag with the text "Encoutered pokemons"', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('should show the next pokemon on the list', () => {
    const NUMBER_OF_EXPECTATIONS = 11;
    expect.assertions(NUMBER_OF_EXPECTATIONS);
    const btnNextPokemon = screen.getByTestId(TESTID_NEXT_POKEMON);
    expect(btnNextPokemon).toHaveTextContent('Próximo pokémon');
    const currentPokemon = screen.getByTestId(TESTID_POKEMON_NAME);
    for (let index = 0; index <= pokemons.length; index += 1) {
      const pokemonIndex = index < pokemons.length
        ? index
        : index - pokemons.length;
      expect(currentPokemon.innerHTML).toBe(pokemons[pokemonIndex].name);
      fireEvent.click(btnNextPokemon);
    }
  });

  it('should only have one pokemon at a time', () => {
    const pokemonArray = screen.getAllByTestId(TESTID_POKEMON_NAME);
    expect(pokemonArray.length).toBe(1);
  });

  it('should have filter buttons for each pokemon type', () => {
    const typeFiltersElements = screen.getAllByTestId(TESTID_POKEMON_TYPE_BUTTON);
    const typeFiltersText = typeFiltersElements.map((filter) => filter.innerHTML);
    const typesWithDuplicates = pokemons.map((pokemon) => pokemon.type);
    const types = Array.from(new Set(typesWithDuplicates));
    expect.assertions(types.length);
    types.forEach((type) => {
      expect(typeFiltersText.includes(type)).toBe(true);
    });
  });

  it('should have a button to reset the filter', () => {
    const POKEMONS_PLUS_ALL_CHECK = 10;
    expect.assertions(POKEMONS_PLUS_ALL_CHECK);
    const resetFilter = screen.getByText('All');
    expect(resetFilter).toBeInTheDocument();
    fireEvent.click(resetFilter);
    const currentPokemon = screen.getByTestId(TESTID_POKEMON_NAME);
    const btnNextPokemon = screen.getByTestId(TESTID_NEXT_POKEMON);
    pokemons.forEach((pokemon) => {
      expect(currentPokemon).toHaveTextContent(pokemon.name);
      fireEvent.click(btnNextPokemon);
    });
  });

  it('should disable the button next-pokemon when there\'s only one', () => {
    const btnNextPokemon = screen.getByTestId(TESTID_NEXT_POKEMON);
    const filterButtonArray = screen.getAllByTestId(TESTID_POKEMON_TYPE_BUTTON);
    fireEvent.click(filterButtonArray[2]);
    expect(btnNextPokemon).toHaveAttribute('disabled');
  });
});
