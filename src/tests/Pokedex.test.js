import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import { readFavoritePokemonIds } from '../services/pokedexService';

function setIsPokemonFavoriteById() {
  const favoritePokemonIds = readFavoritePokemonIds();
  const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
    return acc;
  }, {});

  return isPokemonFavorite;
}

const isPokemonFavoriteById = setIsPokemonFavoriteById();

describe('Testing Pokedex.js component if', () => {
  it('page contains an h2 heading with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const h2Heading = getByRole('heading', { name: 'Encountered pokémons', level: 2 });

    expect(h2Heading).toBeInTheDocument();
  });

  it(`the next Pokémon in the list is displayed when the Next
   Pokémon button is clicked.`, () => {
    const { getByRole, getAllByText, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const btnNextPokemon = getByRole('button', { name: /Próximo pokémon/i });

    expect(btnNextPokemon).toBeInTheDocument();

    for (let i = 0; i < pokemons.length - 1; i += 1) {
      expect(getAllByText(pokemons[i].name).length).toBe(1);
      userEvent.click(btnNextPokemon);
    }

    userEvent.click(btnNextPokemon);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('only one Pokémon is shown at a time', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const btnNextPokemon = getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach(() => {
      expect(getAllByRole('img', { class: 'pokemon' }).length).toBe(1);
      userEvent.click(btnNextPokemon);
    });
  });

  it('Pokédex has the filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const pokemonsTypes = Array.from(new Set(pokemons
      .map((pokemon) => pokemon.type)));
    const filterButtons = getAllByTestId('pokemon-type-button');

    expect(filterButtons.length).toBe(pokemonsTypes.length);

    filterButtons
      .map((button) => button.innerHTML)
      .forEach((type) => expect(pokemonsTypes.includes(type)).toBe(true));
  });

  it('Pokédex contains a button to reset the filter', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonAll = getByText('All');
    const nextPokemonButton = getByText(/próximo pokémon/i);

    expect(buttonAll).toBeInTheDocument();
    expect(getByText(/pikachu/i)).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    expect(getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

  it(`The Next Pokémon button should be disabled when
   the filtered list of Pokémon has only one Pokémon`, () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextPokemonButton = getByText(/próximo pokémon/i);
    const insectTypeFilterButton = getByText(/bug/i);

    expect(insectTypeFilterButton).toBeInTheDocument();
    expect(nextPokemonButton.disabled).toBe(false);

    userEvent.click(insectTypeFilterButton);
    expect(getByText(/caterpie/i)).toBeInTheDocument();
    expect(nextPokemonButton.disabled).toBe(true);
  });
});
