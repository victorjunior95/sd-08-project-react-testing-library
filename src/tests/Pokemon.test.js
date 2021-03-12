import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const testPokemon = pokemons[0];
const weightValue = testPokemon.averageWeight.value;
const weightMeasureU = testPokemon.averageWeight.measurementUnit;

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);

  fireEvent.click(getByText('All'));

  expect(getByTestId('pokemon-name').innerHTML).toBe(testPokemon.name);
  expect(getByTestId('pokemonType').innerHTML).toBe(testPokemon.type);
  expect(getByTestId('pokemon-weight').innerHTML)
    .toBe(`Average weight: ${weightValue} ${weightMeasureU}`);
  expect(getByRole('img').src).toBe(testPokemon.image);
  expect(getByRole('img').alt).toBe(`${testPokemon.name} sprite`);
});

test('Teste o link de detalhes', () => {
  const { history, getByText } = renderWithRouter(<App />);
  const detailsBtn = getByText('More details');

  fireEvent.click(getByText('All'));
  expect(detailsBtn).toBeInTheDocument();
  fireEvent.click(detailsBtn);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${testPokemon.id}`);
  expect(getByText(testPokemon.name)).toBeInTheDocument();
});

test('Teste o icone de favorito', () => {
  const { container, getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText('All'));
  expect(getByText(testPokemon.name)).toBeInTheDocument();
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByText('Pokémon favoritado?'));
  const icon = container.querySelector('.favorite-icon');
  expect(icon)
    .toBeInTheDocument();
  expect(icon.src)
    .toBe('http://localhost/star-icon.svg');
  expect(icon.alt).toBe(`${testPokemon.name} is marked as favorite`);
});
