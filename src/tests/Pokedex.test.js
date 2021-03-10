import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const OITO = 8;
const SETE = 7;

test('Verifica mensagem "Encounteres pokémons"', () => {
  const { getByRole } = renderWithRouter(<App />);

  const title = getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });

  expect(title).toBeInTheDocument();
});

test('Verifica ação "Próximo pokémon "', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const pokeAnterioro = { ...getByTestId('pokemon-name') };
  const btnNo = getByText('Próximo pokémon');

  fireEvent.click(btnNo);

  const pokemonAtual = { ...getByTestId('pokemon-name') };

  for (let index = 0; index < OITO; index += 1) {
    fireEvent.click(btnNo);
  }

  const pokemonAfterLoop = getByText('Pikachu');

  expect(pokeAnterioro).not.toBe(pokemonAtual);
  expect(pokemonAfterLoop).toBeInTheDocument();
});

test('Verifica um pokemon por vez', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const pokemonsAtual = getAllByTestId('pokemon-name');

  expect(pokemonsAtual.length).toBe(1);
});

test('Verifica se tem os btn de filtro', () => {
  const { getAllByTestId, getByRole, getByTestId } = renderWithRouter(<App />);

  const filterPokemon = getAllByTestId('pokemon-type-button');

  expect(filterPokemon.length).toBe(SETE);

  const btnFire = getByRole('button', {
    name: 'Fire',
  });

  fireEvent.click(btnFire);

  const pokemonType = getByTestId('pokemonType');

  expect(pokemonType.innerHTML).toBe('Fire');

  const btn = getByRole('button', {
    name: 'Próximo pokémon',
  });

  fireEvent.click(btn);

  const pokemonsType = getByTestId('pokemonType');

  expect(pokemonsType.innerHTML).toBe('Fire');
});

test('Verifica o botão de resetar filtro', () => {
  const { getByRole, getByText, history } = renderWithRouter(<App />);

  const btnAll = getByRole('button', {
    name: 'All',
  });

  expect(btnAll.innerHTML).toBe('All');

  fireEvent.click(btnAll);

  const firstPokemon = getByText('Pikachu');

  expect(firstPokemon).toBeInTheDocument();

  history.push('/about');
  history.push('/');

  const verificatedPokemon = getByText('Pikachu');

  expect(verificatedPokemon).toBeInTheDocument();
});

test('Verifica filtro para cada tipo', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const filterPokemon = getAllByTestId('pokemon-type-button');

  expect(filterPokemon.length).toBe(SETE);
});

test('Verifica o desabilite do botão próximo', () => {
  const { getByRole } = renderWithRouter(<App />);

  const btnNormal = getByRole('button', {
    name: 'Normal',
  });

  fireEvent.click(btnNormal);

  const btnNext = getByRole('button', {
    name: 'Próximo pokémon',
  });

  expect(btnNext.disabled).toBe(true);
});
