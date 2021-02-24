import React from 'react';
// import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('testando Pokedex', () => {
  const { getByText, getByTestId, getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />,
  );

  const heading = getByText('Encountered pokémons');
  const nextBtn = getByTestId('next-pokemon');
  let currPokemon = getByText('Pikachu');

  expect(currPokemon).toBeInTheDocument();

  fireEvent.click(nextBtn);

  currPokemon = getByText('Charmander');

  expect(currPokemon).toBeInTheDocument();

  expect(nextBtn).toHaveTextContent('Próximo pokémon');
  expect(heading).toBeInTheDocument();

  let pokName = getAllByTestId('pokemon-name');

  expect(pokName.length).toBe(1);

  const filterBtn = getAllByTestId('pokemon-type-button');

  fireEvent.click(filterBtn[3]);

  const btnTxt = filterBtn[3];
  const pokType = getByTestId('pokemonType');

  expect(pokType.innerText).toBe(btnTxt.innerText);

  const resetType = getByText('All');

  expect(resetType).toBeInTheDocument();

  fireEvent.click(resetType);
  pokName = getByTestId('pokemon-name');

  expect(pokName.innerHTML).toBe('Pikachu');

  const allTypes = [...new Set(pokemons.map((pok) => pok.type))];
  const filterBtns = filterBtn.map((btn) => btn.innerHTML);

  expect(filterBtns).toEqual(allTypes);
});
