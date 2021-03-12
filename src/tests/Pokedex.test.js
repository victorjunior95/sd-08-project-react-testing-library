import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';

import { Pokedex } from '../components';
import pokemons from '../data';

const nextPokemon = 'Próximo pokémon';
const favoritePokemon = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

// Mestre Icaro - Revisão RTL
// component pokedex necessita duas props
// id e retornando se ele é falso ou não

describe('Pokedex.js', () => {
  test('should show Pokedex h2Tag heading', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const H2Tag = getByRole('heading', {
      level: 2,
    });

    expect(H2Tag).toHaveTextContent('Encountered pokémons');
  });

  test('should show the next pokemon when button nextPokemonButton is clicked', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const nextPokemonButton = getByRole('button', {
      name: nextPokemon,
    });

    expect(nextPokemonButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const firstPsychicPokemon = getByText(pokemon.name);
      expect(firstPsychicPokemon).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });

    const nextPsychicPokemon = getByText(pokemons[0].name);

    expect(nextPsychicPokemon).toBeInTheDocument();
  });

  test('should only show one pokemon rendered per time', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const showOnePokemon = getAllByTestId('pokemon-name');

    expect(showOnePokemon).toHaveLength(1);
  });

  test('should test filtered button and show filtered pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const psychicPokemonButton = getByRole('button', {
      name: 'Psychic',
    });

    expect(psychicPokemonButton).toBeInTheDocument();

    userEvent.click(psychicPokemonButton);
    const firstPsychicPokemon = getByText('Alakazam');

    expect(firstPsychicPokemon).toBeInTheDocument();

    const nextPokemonButton = getByRole('button', {
      name: nextPokemon,
    });

    userEvent.click(nextPokemonButton);
    let nextPsychicPokemon = getByText('Mew');

    expect(nextPsychicPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    nextPsychicPokemon = getByText('Alakazam');

    expect(nextPsychicPokemon).toBeInTheDocument();
  });

  test('Pokedex should have a button for all pokemons available', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const allPokemonsButton = getByText('All');

    expect(allPokemonsButton).toBeInTheDocument();

    expect(allPokemonsButton).toBeEnabled();

    userEvent.click(allPokemonsButton);

    const nextPokemonButton = getByRole('button', {
      name: nextPokemon,
    });

    userEvent.click(nextPokemonButton);

    let pokemonName = getByText(pokemons[1].name);

    expect(pokemonName).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);

    pokemonName = getByText(pokemons[4].name);

    expect(pokemonName).toBeInTheDocument();
  });

  test('should show a filter button for all Pokemon available types', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const typeOfPokemonsButtons = getAllByTestId('pokemon-type-button');
    const typeOfPokemonsFilters = 7;

    expect(typeOfPokemonsButtons).toHaveLength(typeOfPokemonsFilters);

    const allPokemonsButton = getByText('All');

    expect(allPokemonsButton).toBeInTheDocument();
  });

  test('should disable the NxtPokButton if only one category is chosen', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const bugPokemonButton = getByRole('button', {
      name: 'Bug',
    });

    userEvent.click(bugPokemonButton);

    const nextPokemonButton = getByRole('button', {
      name: nextPokemon,
    });

    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton).toBeDisabled();
  });
});

// https://testing-library.com/docs/ecosystem-user-event/
// https://github.com/testing-library/jest-dom#tohavetextcontent
