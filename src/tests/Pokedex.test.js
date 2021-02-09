import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('shows the Not Found page with route /', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const heading = getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });

  expect(heading).toBeInTheDocument();
});

test('next pokemon was showed', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const buttonNext = getByTestId('next-pokemon');
  expect(buttonNext).toBeInTheDocument();
  expect(buttonNext).toHaveTextContent('Próximo pokémon');

  const actuallyPokemon = getByText('Pikachu');
  expect(actuallyPokemon).toBeInTheDocument();
  userEvent.click(buttonNext);

  let nextPokemon = getByText('Charmander');
  expect(nextPokemon).toBeInTheDocument();

  userEvent.click(buttonNext);
  nextPokemon = getByText('Caterpie');
  expect(nextPokemon).toBeInTheDocument();

  userEvent.click(buttonNext);
  nextPokemon = getByText('Ekans');
  expect(nextPokemon).toBeInTheDocument();

  userEvent.click(buttonNext);
  nextPokemon = getByText('Alakazam');
  expect(nextPokemon).toBeInTheDocument();

  userEvent.click(buttonNext);
  nextPokemon = getByText('Mew');
  expect(nextPokemon).toBeInTheDocument();

  userEvent.click(buttonNext);
  nextPokemon = getByText('Rapidash');
  expect(nextPokemon).toBeInTheDocument();

  userEvent.click(buttonNext);
  nextPokemon = getByText('Snorlax');
  expect(nextPokemon).toBeInTheDocument();

  userEvent.click(buttonNext);
  nextPokemon = getByText('Dragonair');
  expect(nextPokemon).toBeInTheDocument();

  userEvent.click(buttonNext);
  expect(actuallyPokemon).toBeInTheDocument();
});

test('shows only one pokemon', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const image = getByRole('img');
  expect(image).toBeInTheDocument();
});

test('show Eletric pokemons', () => {
  const { getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const eletricButton = getByRole('button', { name: /Electric/i });
  userEvent.click(eletricButton);
  const containText = getByTestId('pokemonType');
  expect(containText).toHaveTextContent('Electric');
});

test('show Fire pokemons', () => {
  const { getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const fireButton = getByRole('button', { name: /Fire/i });
  userEvent.click(fireButton);
  const containText = getByTestId('pokemonType');
  expect(containText).toHaveTextContent('Fire');
});

test('show Bug pokemons', () => {
  const { getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const bugButton = getByRole('button', { name: /Bug/i });
  userEvent.click(bugButton);
  const containText = getByTestId('pokemonType');
  expect(containText).toHaveTextContent('Bug');
});

test('show Poison pokemons', () => {
  const { getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const poisonButton = getByRole('button', { name: /Poison/i });
  userEvent.click(poisonButton);
  const containText = getByTestId('pokemonType');
  expect(containText).toHaveTextContent('Poison');
});

test('show Psychic pokemons', () => {
  const { getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const psychicButton = getByRole('button', { name: /Psychic/i });
  userEvent.click(psychicButton);
  const containText = getByTestId('pokemonType');
  expect(containText).toHaveTextContent('Psychic');
});

test('show Normal pokemons', () => {
  const { getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const normalButton = getByRole('button', { name: /Normal/i });
  userEvent.click(normalButton);
  const containText = getByTestId('pokemonType');
  expect(containText).toHaveTextContent('Normal');
});

test('show Dragon pokemons', () => {
  const { getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const dragonButton = getByRole('button', { name: /Dragon/i });
  userEvent.click(dragonButton);
  const containText = getByTestId('pokemonType');
  expect(containText).toHaveTextContent('Dragon');
});

test('show all button', () => {
  const { getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const allButton = getByRole('button', { name: /All/i });
  userEvent.click(allButton);
  const containText = getByTestId('pokemonType');
  expect(containText).toHaveTextContent('Electric');
  expect(allButton).toHaveTextContent('All');
  expect(allButton).toBeInTheDocument();
});

test('show all filters buttons in screen', () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const allButtons = getAllByTestId('pokemon-type-button');
  expect(allButtons.length).toBe('7');
});
