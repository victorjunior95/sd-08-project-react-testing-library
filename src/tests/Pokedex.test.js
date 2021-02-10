import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('there is a "h2" with the text "Encountered pokémons"', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const h2 = getByRole('heading', { level: 2 });
  expect(h2).toHaveTextContent('Encountered pokémons');
});

test('test if it shows the next pokemon when click', () => {
  const lengthPokemons = 8;
  const pokemonTestId = 'pokemon-name';
  const { getByTestId, getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const nextButton = getByText(/próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();
  const firstPokemon = getByTestId(pokemonTestId).innerHTML;
  userEvent.click(nextButton);
  const nextPokemon = getByTestId(pokemonTestId);
  expect(nextPokemon).not.toHaveTextContent(firstPokemon);
  for (let i = 1; i < lengthPokemons; i += 1) {
    userEvent.click(nextButton);
  }
  expect(getByTestId(pokemonTestId)).not.toHaveTextContent(firstPokemon);
  userEvent.click(nextButton);
  expect(getByTestId(pokemonTestId)).toHaveTextContent(firstPokemon);
});

test('test if it shows only 1 pokemon at a time', () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const numberOfPokemons = getAllByTestId('pokemon-name');
  expect(numberOfPokemons).not.toBeNull();
  expect(numberOfPokemons.length).toBe(1);
});

test('test if there are the filter buttons', () => {
  const { getByTestId, getAllByTestId, getAllByRole, getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
  const filterButtons = getAllByTestId('pokemon-type-button');
  expect(filterButtons.length).toBeGreaterThan(0);
  const psychicButton = getAllByRole('button')[5];
  expect(psychicButton).toHaveTextContent('Psychic');
  userEvent.click(psychicButton);
  expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');
  const nextButton = getByText(/próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();
  userEvent.click(nextButton);
  expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');
});

test('test if there is a button to reset filter', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();
  const firstPokemonType = getByTestId('pokemonType').innerHTML;
  expect(firstPokemonType).toBe('Electric');
  const nextButton = getByText(/próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();
  userEvent.click(nextButton);
  expect(getByTestId('pokemonType')).not.toHaveTextContent(firstPokemonType);
  userEvent.click(allButton);
  expect(getByTestId('pokemonType')).toHaveTextContent(firstPokemonType);
});

test('test if next pokemon button is disable when there is only one of the type', () => {
  const { getAllByRole, getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const nextButton = getByText(/próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).not.toBeDisabled();
  const electricButton = getAllByRole('button')[1];
  userEvent.click(electricButton);
  expect(nextButton).toBeDisabled();
});
