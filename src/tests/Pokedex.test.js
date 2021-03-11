import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test component Pokedex', () => {
  const TESTID_NEXT_POKEMON = 'next-pokemon';
  const TESTID_POKEMON_NAME = 'pokemon-name';
  const TESTID_POKEMON_TYPE_BUTTON = 'pokemon-type-button';

  it('should have an h2 tag with the text "Encoutered pokemons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('should show the next pokemon after click the button Proximo Pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btnNextPokemon = getByTestId(TESTID_NEXT_POKEMON);
    expect(btnNextPokemon).toHaveTextContent('Próximo pokémon');

    expect(getByTestId(TESTID_POKEMON_NAME)).toHaveTextContent('Pikachu');

    fireEvent.click(btnNextPokemon);
    expect(getByTestId(TESTID_POKEMON_NAME)).toHaveTextContent('Charmander');

    fireEvent.click(btnNextPokemon);
    expect(getByTestId(TESTID_POKEMON_NAME)).toHaveTextContent('Caterpie');

    if (getByTestId(TESTID_POKEMON_NAME).innerHTML === 'Dragonair') {
      fireEvent.click(btnNextPokemon);
      expect(getByTestId(TESTID_POKEMON_NAME)).toHaveTextContent('Pikachu');
    }
  });

  it('should only show one pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonArray = getAllByTestId(TESTID_POKEMON_NAME);
    expect(pokemonArray.length).toBe(1);
  });

  it('should have filter buttons', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const filterButtonArray = getAllByTestId(TESTID_POKEMON_TYPE_BUTTON);
    fireEvent.click(filterButtonArray[3]);
    const pokemonType = getByTestId('pokemonType');
    expect(filterButtonArray[3]).toHaveTextContent(pokemonType.innerHTML);
  });

  it('should have a button to reset the filters', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btnResetFilter = getByTestId('');
    expect(btnResetFilter).toHaveTextContent('All');
    const btnNextPokemon = getByTestId(TESTID_NEXT_POKEMON);
    const pokemon1 = getByTestId('pokemonType').innerHTML;
    fireEvent.click(btnNextPokemon);
    const pokemon2 = getByTestId('pokemonType').innerHTML;
    expect(pokemon1).not.toBe(pokemon2);
  });

  it('should have one filter button for each pokemon type', () => {
    const TYPES = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal']
      .sort();
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterButtonsElements = getAllByTestId(TESTID_POKEMON_TYPE_BUTTON);
    const filterButtonsTypesSorted = filterButtonsElements
      .map((type) => type.innerHTML)
      .sort();
    expect(filterButtonsTypesSorted).toEqual(TYPES);
  });

  it('should disable the button next-pokemon when there\'s only one', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const btnNextPokemon = getByTestId(TESTID_NEXT_POKEMON);
    const filterButtonArray = getAllByTestId(TESTID_POKEMON_TYPE_BUTTON);
    fireEvent.click(filterButtonArray[2]);
    expect(btnNextPokemon).toHaveAttribute('disabled');
  });
});
