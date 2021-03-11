import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const NEXT_POKEMON = 'next-pokemon';
const POKEMON_NAME = 'pokemon-name';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const info = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(info.textContent).toBe('Encountered pokémons');
});

test('O botão deve conter o texto Próximo pokémon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const nextButton = getByTestId(NEXT_POKEMON);
  expect(nextButton.textContent).toBe('Próximo pokémon');
});

test('Pokémons da lista devem ser mostrados, um a um', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const nextButton = getByTestId(NEXT_POKEMON);
  userEvent.click(nextButton);
  const pokemonName = getByTestId(POKEMON_NAME);
  expect(pokemonName.textContent).toBe('Charmander');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Caterpie');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Ekans');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Alakazam');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Mew');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Rapidash');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Snorlax');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Dragonair');
});

test('O primeiro Pokémon da lista deve ser mostrado ao clicar no último', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const nextButton = getByTestId(NEXT_POKEMON);
  userEvent.click(nextButton);
  const pokemonName = getByTestId(POKEMON_NAME);
  expect(pokemonName.textContent).toBe('Charmander');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Caterpie');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Ekans');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Alakazam');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Mew');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Rapidash');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Snorlax');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Dragonair');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Pikachu');
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const pokemonName = getAllByTestId(POKEMON_NAME);
  expect(pokemonName.length).toBe(1);
  const nextButton = getByTestId(NEXT_POKEMON);
  userEvent.click(nextButton);
  expect(pokemonName.length).toBe(1);
});

test('A partir da seleção de um botão de tipo', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
  const typeButton = getAllByTestId('pokemon-type-button');
  expect(typeButton[1].textContent).toBe('Fire');
  userEvent.click(typeButton[1]);
  const pokemonName = getByTestId(POKEMON_NAME);
  expect(pokemonName.textContent).toBe('Charmander');
  const nextButton = getByTestId(NEXT_POKEMON);
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Rapidash');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).not.toBe('Pikachu');
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const typeButton = getByRole('button', {
    name: /All/i,
  });
  expect(typeButton.disabled).toBe(false);
  const pokemonName = getByTestId(POKEMON_NAME);
  const nextButton = getByTestId(NEXT_POKEMON);
  userEvent.click(typeButton);
  expect(pokemonName.textContent).toBe('Pikachu');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Charmander');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Caterpie');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Ekans');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Alakazam');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Mew');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Rapidash');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Snorlax');
  userEvent.click(nextButton);
  expect(pokemonName.textContent).toBe('Dragonair');
});

test('desabilitado quando a lista filtrada de Pokémons tiver um só pokémon', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
  const typeButton = getAllByTestId('pokemon-type-button');
  expect(typeButton[0].textContent).toBe('Electric');
  userEvent.click(typeButton[0]);
  const nextButton = getByTestId('next-pokemon');
  expect(nextButton.disabled).toBe(true);
});
