import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

const isFavorite = {
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

describe('Pokedex page', () => {
  it('Should render a h2 element with "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const pokedexTitle = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Should render next pokémon after clicking "Próximo botão"', () => {
    const { getByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const THIRD_POKEMON_INDEX = 3;
    const LAST_POKEMON_INDEX = 9;

    const nextButton = getByRole('button', { name: /próximo pokémon/i });

    expect(queryByText(/pikachu/i)).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(queryByText(/charmander/i)).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(queryByText(/charmander/i)).not.toBeInTheDocument();
    expect(queryByText(/caterpie/i)).toBeInTheDocument();

    for (let i = THIRD_POKEMON_INDEX; i <= LAST_POKEMON_INDEX; i += 1) {
      userEvent.click(nextButton);
    }
    expect(queryByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Should render only one pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('Should filter the pokemons by type', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    userEvent.click(getByRole('button', { name: /bug/i }));
    let pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Bug');

    userEvent.click(getByRole('button', { name: /electric/i }));
    pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  it('Should have a reset button with "All" text', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });

    const allButton = getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    let previousPokemonType = getByTestId('pokemonType').innerHTML;
    userEvent.click(nextButton);
    expect(getByTestId('pokemonType').innerHTML).not.toBe(previousPokemonType);

    userEvent.click(getByRole('button', { name: /bug/i }));
    userEvent.click(allButton);
    previousPokemonType = getByTestId('pokemonType').innerHTML;
    userEvent.click(nextButton);
    expect(getByTestId('pokemonType').innerHTML).not.toBe(previousPokemonType);
  });

  it('Should render filter buttons dynamicaly', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const TYPES_QUANTITY = 7;

    const pokemonTypesButtons = getAllByTestId('pokemon-type-button');
    expect(pokemonTypesButtons.length).toBe(TYPES_QUANTITY);
  });

  it('Should disable next pokemon button if only one pokemon', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(getByRole('button', { name: /electric/i }));
    expect(nextButton).toBeDisabled();
  });
});
