import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 5', () => {
  const pokemonName = 'pokemon-name';
  it('should have a heading h2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const header = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(header).toBeInTheDocument();
  });

  it('should change the pokemon after click button', () => {
    const { getByRole, queryByTestId } = renderWithRouter(<App />);
    const firstPokemon = queryByTestId(pokemonName);
    const buttonChangePokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const firstPokemonName = firstPokemon[Object.keys(firstPokemon)[1]].children;
    expect(firstPokemon).toBeInTheDocument();
    expect(buttonChangePokemon).toBeInTheDocument();
    fireEvent.click(buttonChangePokemon);
    const secondPokemon = queryByTestId(pokemonName);
    const secondPokemonName = secondPokemon[Object.keys(secondPokemon)[1]].children;
    expect(firstPokemonName).not.toBe(secondPokemonName);
  });

  it('should be just one card on click next pokemon', () => {
    const { queryAllByTestId, getByRole } = renderWithRouter(<App />);
    const buttonChangePokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    fireEvent.click(buttonChangePokemon);
    fireEvent.click(buttonChangePokemon);
    const pokemons = queryAllByTestId(pokemonName);
    expect(pokemons.length).toBe(1);
  });

  it('should have buttons filter', () => {
    const { getByRole, queryByTestId } = renderWithRouter(<App />);
    const types = [
      'All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];
    types.forEach((type) => {
      expect(getByRole('button', {
        name: type,
      })).toBeInTheDocument();
    });
    const buttonFire = getByRole('button', {
      name: 'Fire',
    });
    const buttonChangePokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    fireEvent.click(buttonFire);
    let pokemonType = queryByTestId('pokemonType');
    const firstPokemonTypeName = pokemonType[Object.keys(pokemonType)[1]].children;
    fireEvent.click(buttonChangePokemon);
    pokemonType = queryByTestId('pokemonType');
    let typeName = pokemonType[Object.keys(pokemonType)[1]].children;
    expect(typeName).toBe(firstPokemonTypeName);
    fireEvent.click(buttonChangePokemon);
    pokemonType = queryByTestId('pokemonType');
    typeName = pokemonType[Object.keys(pokemonType)[1]].children;
    expect(typeName).toBe(firstPokemonTypeName);
    fireEvent.click(buttonChangePokemon);
    pokemonType = queryByTestId('pokemonType');
    typeName = pokemonType[Object.keys(pokemonType)[1]].children;
    expect(typeName).toBe(firstPokemonTypeName);
    fireEvent.click(buttonChangePokemon);
    pokemonType = queryByTestId('pokemonType');
    typeName = pokemonType[Object.keys(pokemonType)[1]].children;
    expect(typeName).toBe(firstPokemonTypeName);
    fireEvent.click(buttonChangePokemon);
    pokemonType = queryByTestId('pokemonType');
    typeName = pokemonType[Object.keys(pokemonType)[1]].children;
    expect(typeName).toBe(firstPokemonTypeName);
  });

  it('should have a button "All"', () => {
    const { getByRole, queryByTestId, queryByText } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', {
      name: 'All',
    });
    const buttonChangePokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
    const pikachu = queryByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    let pokemon = queryByTestId(pokemonName);
    let pokemonType = queryByTestId('pokemonType');
    const pokemonTypeName = pokemonType[Object.keys(pokemonType)[1]].children;
    expect(pokemon).toBeInTheDocument();
    fireEvent.click(buttonChangePokemon);
    pokemon = queryByTestId(pokemonName);
    expect(pokemon).toBeInTheDocument();
    pokemonType = queryByTestId('pokemonType');
    const pokemonTypeAfterClick = pokemonType[Object.keys(pokemonType)[1]].children;
    expect(pokemonTypeAfterClick).not.toBe(pokemonTypeName);
  });

  it('should All be selected', () => {
    const { queryByTestId, getByRole } = renderWithRouter(<App />);
    const buttonChangePokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const firstPokemon = queryByTestId('pokemon-name');
    let actualName = firstPokemon[Object.keys(firstPokemon)[1]].children;
    expect(actualName).toBe('Pikachu');
    fireEvent.click(buttonChangePokemon);
    actualName = firstPokemon[Object.keys(firstPokemon)[1]].children;
    expect(actualName).toBe('Charmander');
  });

  it('should have all buttons dinamic', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const btnQuantity = 7;
    const buttons = getAllByTestId('pokemon-type-button');
    const buttonAll = getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeInTheDocument();
    expect(buttons.length).toBe(btnQuantity);
  });

  it('should disable button next pokemon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const buttonNext = getByTestId('next-pokemon');
    const buttonBug = getByRole('button', { name: 'Bug' });
    const buttonPoison = getByRole('button', { name: 'Poison' });
    fireEvent.click(buttonBug);
    fireEvent.click(buttonPoison);
    expect(buttonNext).toHaveAttribute('disabled');
    expect(buttonNext).toHaveAttribute('disabled');
  });
});
