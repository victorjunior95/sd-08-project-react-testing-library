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

describe('Pokedex.js', () => {
  it('shows Pokedex heading', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const pokedexHeading = getByRole('heading', {
      level: 2,
    });
    expect(pokedexHeading).toHaveTextContent('Encountered pokémons');
  });

  it('shows the next pokemon when button is clicked', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    const firstpokemonName = getByText(pokemons[0].name);
    expect(firstpokemonName).toBeInTheDocument();
  });

  it('shows if only one pokemon is rendered at a time', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const pokemonNames = getAllByTestId('pokemon-name');
    expect(pokemonNames).toHaveLength(1);
  });

  it('shows only filtered pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const psychicButton = getByRole('button', {
      name: 'Psychic',
    });
    expect(psychicButton).toBeInTheDocument();
    userEvent.click(psychicButton);

    const pokemonName = getByText('Alakazam');
    expect(pokemonName).toBeInTheDocument();

    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    userEvent.click(nextButton);
    let nextPokemonName = getByText('Mew');
    expect(nextPokemonName).toBeInTheDocument();

    userEvent.click(nextButton);
    nextPokemonName = getByText('Alakazam');
    expect(nextPokemonName).toBeInTheDocument();
  });

  it('has an all pokemon button', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();
    expect(allButton).toBeEnabled();

    userEvent.click(allButton);
    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    userEvent.click(nextButton);

    let pokemonName = getByText(pokemons[1].name);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    pokemonName = getByText(pokemons[3].name);
    expect(pokemonName).toBeInTheDocument();
  });

  it('shows filter buttons for all types', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const typeButtons = getAllByTestId('pokemon-type-button');
    const typeFilters = 7;
    expect(typeButtons).toHaveLength(typeFilters);

    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();
  });

  it('disables next button if theres only one pokemon in the selected category', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const dragonButton = getByRole('button', {
      name: 'Dragon',
    });
    userEvent.click(dragonButton);

    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
});
