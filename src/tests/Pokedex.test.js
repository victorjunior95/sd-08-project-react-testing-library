import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWitheRouter';

import { Pokedex } from '../components';
import pokemons from '../data';

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

const nextPokemon = 'Próximo pokémon';

describe('Pokedex Test', () => {
  it('Verifies if the page has a <h2> and if it has the correct text', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const getH2 = getByRole('heading', { level: 2 });
    expect(getH2).toBeInTheDocument();
    const text = getByText('Encountered pokémons');
    expect(text).toBeInTheDocument();
  });
  it('Verifies if the button /Proximo Pokémon/ is working well', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokedex
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
      fireEvent.click(nextButton);
    });
    const firstpokemonName = getByText(pokemons[0].name);
    expect(firstpokemonName).toBeInTheDocument();
  });

  it('verifies if only one pokemon is being rendered at time', () => {
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
    fireEvent.click(psychicButton);

    const pokemonName = getByText('Alakazam');
    expect(pokemonName).toBeInTheDocument();

    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    fireEvent.click(nextButton);
    let nextPokemonName = getByText('Mew');
    expect(nextPokemonName).toBeInTheDocument();

    fireEvent.click(nextButton);
    nextPokemonName = getByText('Alakazam');
    expect(nextPokemonName).toBeInTheDocument();
  });

  it('verifies if there is the All POKEMONS BUTTON', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();
    expect(allButton).toBeEnabled();

    fireEvent.click(allButton);
    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    fireEvent.click(nextButton);

    let pokemonName = getByText(pokemons[1].name);
    expect(pokemonName).toBeInTheDocument();

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    pokemonName = getByText(pokemons[3].name);
    expect(pokemonName).toBeInTheDocument();
  });

  it('verifies if the button is disabled', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const dragonButton = getByRole('button', {
      name: 'Dragon',
    });
    fireEvent.click(dragonButton);

    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
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
});
