import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favorites = {
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
describe('Requisito 5, Pokédex.js', () => {
  test('There should be a heading h2', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const textTitle = getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(textTitle).toBeInTheDocument();
  });
  test('The button must have a text', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const buttonText = getByRole('button', { name: /próximo pokémon/i });
    expect(buttonText).toBeInTheDocument();
  });
  test('The pokemons should be displayed one by one', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const button = getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(button);
    });
  });
  test('The first pokemon "Pikachu" should be displayed', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const button = getByRole('button', { name: /próximo pokémon/i });
    const LAST_POSITION = 9;
    for (let index = 0; index < LAST_POSITION; index += 1) {
      userEvent.click(button);
    }
    const firstPokemon = getByText('Pikachu').innerHTML;
    expect(firstPokemon).toBe('Pikachu');
  });
  test('Should be displayed one pokemon at a time', () => {
    const { getAllByRole, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const button = getByRole('button', { name: /próximo pokémon/i });
    for (let index = 0; index < pokemons.length; index += 1) {
      const imageLength = getAllByRole('img').length;
      expect(imageLength).toBe(1);
      userEvent.click(button);
    }
  });
  test('There should be filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const filterButtonQuant = getAllByTestId('pokemon-type-button').length;
    const FILTER_QUANT = 7;
    expect(filterButtonQuant).toBe(FILTER_QUANT);
  });
  test('Pokemon must have a specific type', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const filterButton = getByRole('button', { name: 'Fire' });
    const button = getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(filterButton);
    expect(getByTestId('pokemonType').innerHTML).toBe('Fire');
    userEvent.click(button);
    expect(getByTestId('pokemonType').innerHTML).toBe('Fire');
  });
  test('There should be a button "All"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const allButton = getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
  test('The filter should be reseted', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    const allButton = getByRole('button', { name: /all/i });
    const currentPokemon = getByText('Pikachu');
    expect(currentPokemon).toBeInTheDocument();
    userEvent.click(nextButton);
    let nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextButton);
    nextPokemon = getByText('Caterpie');
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(allButton);
    expect(currentPokemon).toBeInTheDocument();
  });
  test('There should be a button for each type', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const filterButtons = getAllByTestId('pokemon-type-button');
    const FILTER_QUANT = 7;
    expect(filterButtons.length).toBe(FILTER_QUANT);
  });
  test('The button should be disabled', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    const electricButton = getByRole('button', { name: /electric/i });
    userEvent.click(electricButton);
    expect(nextButton.disabled).toBe(true);
  });
});
