import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import data from '../data';
import renderWithRouter from './renderWithRouter';

const ID1 = 25;
const ID2 = 10;
const mockFavorites = data.reduce((favorites, { id }) => {
  if ([ID1, ID2].includes(id)) favorites[id] = true;
  else favorites[id] = false;
  return favorites;
}, {});

const type1 = 'Electric';
const type2 = 'Fire';
const arrOfTypes = [
  {
    groupType: type1,
    filteredPokes: data.filter(({ type }) => type === type1),
  },
  {
    groupType: type2,
    filteredPokes: data.filter(({ type }) => type === type2),
  },
];

const testid = 'data-testid';
const pokeNameStr = 'pokemon-name';

describe('Pokedex.js tests', () => {
  it('Should has a specific text in a tag `h2`', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ mockFavorites }
    />);

    const h2Pokedex = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2Pokedex).toBeInTheDocument();
  });

  it('Should has `Próximo pokémon` button working in all cases', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ mockFavorites }
    />);

    let firstPokemonName = screen.getByText((content, element) => (
      element.getAttribute(testid) === pokeNameStr
    ));
    expect(firstPokemonName.textContent).toBe(data[0].name);

    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);

    const nextPokeButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    data.forEach(({ name }) => {
      const pokeCardName = screen.getByText((content, element) => (
        element.getAttribute(testid) === pokeNameStr
      ));
      expect(pokeCardName.textContent).toBe(name);

      userEvent.click(nextPokeButton);
    });

    firstPokemonName = screen.getByText((content, element) => (
      element.getAttribute(testid) === pokeNameStr
    ));
    expect(firstPokemonName.textContent).toBe(data[0].name);
  });

  it('Should have all typeButtons and get around only with the type selected', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ mockFavorites }
    />);

    const pokeTypes = [...new Set(data.reduce((types,
      { type }) => [...types, type], []))];

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach(({ textContent }) => {
      expect(pokeTypes.includes(textContent)).toBeTruthy();
    });

    arrOfTypes.forEach(({ groupType, filteredPokes }) => {
      const typeButton = screen.getByRole('button', { name: groupType });
      userEvent.click(typeButton);

      const pokeCardType = screen.getByText((content, element) => (
        element.getAttribute(testid) === 'pokemonType'
      ));
      expect(pokeCardType.textContent).toBe(groupType);

      const nextPokeButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      if (filteredPokes.length <= 1) expect(nextPokeButton).toBeDisabled();
    });
  });
});
