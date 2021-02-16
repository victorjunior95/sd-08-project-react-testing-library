import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

// const types = pokemons.reduce((acc = [], current) => [...acc, current.type], []);
// console.log(types);

const types = pokemons.reduce((acc = [], current) => {
  const currentIsNotReapeated = acc.every((type) => type !== current.type);
  if (currentIsNotReapeated) return [...acc, current.type];
  return acc;
}, []);
console.log(types);

describe(' Pokedex.js', () => {
  it('page contains an h2 heading with the text Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('the next Pokémon on the list when the Next Pokémon button is clicked', () => {
    const { getByText } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
      const nextPokemonButton = getByText(/Próximo pokémon/i);
      userEvent.click(nextPokemonButton);
    });

    const titlePikachu = getByText(/Pikachu/i);
    expect(titlePikachu).toBeInTheDocument();
  });
  it('only one Pokémon is shown at a time', () => {
    const { getAllByTestId, getByText,
    } = renderWithRouter(<App />);

    pokemons.forEach(() => {
      const pokemonName = getAllByTestId('pokemon-name');
      expect(pokemonName.length).toBe(1);
      const nextPokemonButton = getByText(/Próximo pokémon/i);
      userEvent.click(nextPokemonButton);
    });
  });
  it('Pokédex has the filter buttons', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);

    const buttonAll = getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeInTheDocument();

    const buttonsType = getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(buttonsType.length).toBe(seven);

    types.forEach((type) => {
      const buttonType = getByRole('button', {
        name: type,
      });
      expect(buttonType).toBeInTheDocument();
      userEvent.click(buttonType);

      const pokemonsFiltered = pokemons.filter((pokemon) => (pokemon.type === type));

      pokemonsFiltered.forEach((pokemon) => {
        expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
        const nextPokemonButton = getByText(/Próximo pokémon/i);
        userEvent.click(nextPokemonButton);
      });
      const firstPokemon = getByText(pokemonsFiltered[0].name);
      expect(firstPokemon).toBeInTheDocument();
    });
  });
  it('Pokédex contains a button to reset the filter', () => {
    const { getByText, getByRole,
    } = renderWithRouter(<App />);

    const buttonAll = getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    pokemons.forEach((pokemon) => {
      expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
      const nextPokemonButton = getByText(/Próximo pokémon/i);
      userEvent.click(nextPokemonButton);
    });
    const titlePikachu = getByText(/Pikachu/i);
    expect(titlePikachu).toBeInTheDocument();
  });
  it('a filter button is created dynamically for each type of Pokémon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    types.forEach((type) => {
      const buttonAll = getByRole('button', {
        name: 'All',
      });
      expect(buttonAll).toBeInTheDocument();

      const buttonType = getByRole('button', {
        name: type,
      });
      expect(buttonType).toBeInTheDocument();
      userEvent.click(buttonType);

      const pokemonsFiltered = pokemons.filter((pokemon) => (pokemon.type === type));

      pokemonsFiltered.forEach((pokemon) => {
        expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
        const nextPokemonButton = getByText(/Próximo pokémon/i);
        if (pokemonsFiltered.length <= 1) {
          expect(nextPokemonButton).toHaveAttribute('disabled');
        }
        userEvent.click(nextPokemonButton);
      });
      const firstPokemon = getByText(pokemonsFiltered[0].name);
      expect(firstPokemon).toBeInTheDocument();
    });
  });
});
