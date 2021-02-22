import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Testando a renderização do comp NotFound na rota /', () => {
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

test('Testando se o próximo pokemon aparece', () => {
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

test('Testando se apenas um pokemon é exibido', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const image = getByRole('img');
  expect(image).toBeInTheDocument();
});

test('Testando se apenas pokemons elétricos aparecem', () => {
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

test('Testando se apenas pokemons de fogo aparecem', () => {
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

test('Testando se apenas pokemons insetos aparecem', () => {
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

test('Testando se apenas pokemons venenosos aparecem', () => {
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

test('Testando se apenas pokemons psíquicos aparecem', () => {
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

test('Testando se apenas pokemons normais aparecem', () => {
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

test('Testando se apenas pokemons dragões aparecem', () => {
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

test('Testando se todos pokemons aparecem', () => {
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

test('Testando se todos os filtros aparecem', () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const value = 7;

  const allButtons = getAllByTestId('pokemon-type-button');
  expect(allButtons.length).toBe(value);
});
