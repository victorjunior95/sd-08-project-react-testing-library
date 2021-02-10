import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
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

const dataName = 'pokemon-name';
const seven = 7;

describe('test Pokedex.js', () => {
  it('test title page', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const titleText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(titleText).toBeInTheDocument();
  });

  it('next pokemon button test', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(buttonNext);

    const nextPokemon = screen.getByTestId(dataName);

    expect(nextPokemon.innerHTML).toBe('Charmander');
  });

  it('button type', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonType = screen.getByRole('button', {
      name: 'Psychic',
    });

    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(buttonType);

    const firstPokemon = screen.getByTestId(dataName);

    expect(firstPokemon.innerHTML).toBe('Alakazam');

    userEvent.click(buttonNextPokemon);

    const secondPokemon = screen.getByTestId(dataName);

    expect(secondPokemon.innerHTML).toBe('Mew');
  });

  it('test button all', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });

    const buttonBug = screen.getByRole('button', {
      name: /Bug/i,
    });

    userEvent.click(buttonBug);

    const bugPokemon = screen.getByTestId(dataName);
    expect(bugPokemon.innerHTML).toBe('Caterpie');

    userEvent.click(buttonAll);

    const firstPokemonAll = screen.getByTestId(dataName);
    expect(firstPokemonAll.innerHTML).toBe('Pikachu');
  });

  it('buttons type', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonAllType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonAllType.length).toBe(seven);

    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(buttonAll).toBeInTheDocument();
  });
});
