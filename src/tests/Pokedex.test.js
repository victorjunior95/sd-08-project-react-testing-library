import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Tests for Pokedex component', () => {
  it('contains a heading h2 with text Encountered pokémons', async () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const heading = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(heading).toBeInTheDocument();
  });
});

describe('testing next button', () => {
  it('next button exists and works', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const POKEMON_NAME = 'pokemon-name';
    const nextPokemonButton = getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    const pikachuName = getByTestId(POKEMON_NAME);
    expect(pikachuName).toHaveTextContent(/pikachu/i);
    userEvent.click(nextPokemonButton);

    const charmanderName = getByTestId(POKEMON_NAME);
    expect(charmanderName).toHaveTextContent(/charmander/i);
    userEvent.click(nextPokemonButton);

    const caterpieName = getByTestId(POKEMON_NAME);
    expect(caterpieName).toHaveTextContent(/caterpie/i);
    userEvent.click(nextPokemonButton);

    const ekansName = getByTestId(POKEMON_NAME);
    expect(ekansName).toHaveTextContent(/ekans/i);
    userEvent.click(nextPokemonButton);

    const alakazamName = getByTestId(POKEMON_NAME);
    expect(alakazamName).toHaveTextContent(/alakazam/i);
    userEvent.click(nextPokemonButton);

    const mewName = getByTestId(POKEMON_NAME);
    expect(mewName).toHaveTextContent(/mew/i);
    userEvent.click(nextPokemonButton);

    const rapidashName = getByTestId(POKEMON_NAME);
    expect(rapidashName).toHaveTextContent(/rapidash/i);
    userEvent.click(nextPokemonButton);

    const snorlaxName = getByTestId(POKEMON_NAME);
    expect(snorlaxName).toHaveTextContent(/snorlax/i);
    userEvent.click(nextPokemonButton);

    const dragonairName = getByTestId(POKEMON_NAME);
    expect(dragonairName).toHaveTextContent(/dragonair/i);
    userEvent.click(nextPokemonButton);

    expect(pikachuName).toHaveTextContent(/pikachu/i);
  });
});

describe('show pokémon', () => {
  it('show only one pokémon per time', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const allPokemons = getAllByRole('img');
    expect(allPokemons.length).toBe(1);
  });
});

describe('testing filter buttons', () => {
  it('show all type buttons', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const NUMBER_OF_TYPES = 7;

    const allTypeButtons = getAllByTestId('pokemon-type-button');
    expect(allTypeButtons.length).toBe(NUMBER_OF_TYPES);
  });

  it('show electric button', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const electricButton = getByRole('button', {
      name: /electric/i,
    });
    expect(electricButton).toBeInTheDocument();
  });
});

describe('testing all button', () => {
  /* TODO */
  it('show all button', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const allButton = getByRole('button', {
      name: /all/i,
    });

    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  });
});
