import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import Pokedex from '../components/Pokedex';

import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const renderPokedexWithRouter = () => renderWithRouter(
  <Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />,
);

describe('Tests the `<Pokédex />` component', () => {
  it('should render a h2 element with `Encountered pokémons`.', () => {
    const { getByRole } = renderPokedexWithRouter();

    expect(
      getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render next Pokémon after clicking `Próximo botão`.', () => {
    const { getByRole, queryByText } = renderPokedexWithRouter();

    const THIRD_POKEMON_INDEX = 3;
    const LAST_POKEMON_INDEX = 9;

    expect(queryByText(/pikachu/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /próximo pokémon/i }))
      .toBeInTheDocument();

    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(queryByText(/charmander/i)).toBeInTheDocument();

    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(queryByText(/charmander/i)).not.toBeInTheDocument();
    expect(queryByText(/caterpie/i)).toBeInTheDocument();

    for (let i = THIRD_POKEMON_INDEX; i <= LAST_POKEMON_INDEX; i += 1) {
      userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    }
    expect(queryByText(/pikachu/i)).toBeInTheDocument();
  });

  it('should render only one Pokémon.', () => {
    const { getAllByTestId } = renderPokedexWithRouter();

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('should filter the Pokémons by type.', () => {
    const { getByRole, getByTestId } = renderPokedexWithRouter();

    userEvent.click(getByRole('button', { name: /bug/i }));
    expect(getByTestId('pokemonType').innerHTML).toBe('Bug');

    userEvent.click(getByRole('button', { name: /electric/i }));
    expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
  });

  it('should have a reset button with a "All" text.', () => {
    const { getByRole, getByTestId } = renderPokedexWithRouter();

    expect(getByRole('button', { name: /all/i })).toBeInTheDocument();

    let previousPokemonType = getByTestId('pokemonType').innerHTML;
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByTestId('pokemonType').innerHTML)
      .not.toBe(previousPokemonType);

    userEvent.click(getByRole('button', { name: /bug/i }));
    userEvent.click(getByRole('button', { name: /all/i }));

    previousPokemonType = getByTestId('pokemonType').innerHTML;
    userEvent.click(getByRole('button', { name: /próximo pokémon/i }));
    expect(getByTestId('pokemonType').innerHTML)
      .not.toBe(previousPokemonType);
  });

  it('should render filter buttons dynamically.', () => {
    const { getAllByTestId } = renderPokedexWithRouter();

    const TYPES_QUANTITY = 7;

    expect(getAllByTestId('pokemon-type-button').length)
      .toBe(TYPES_QUANTITY);
  });

  it('should disable Próximo pokémon button if there is only one Pokémon.', () => {
    const { getByRole } = renderPokedexWithRouter();

    userEvent.click(getByRole('button', { name: /electric/i }));
    expect(getByRole('button', { name: /próximo pokémon/i }))
      .toBeDisabled();
  });
});
