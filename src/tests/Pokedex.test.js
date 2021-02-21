/* eslint-disable indent */
/* eslint-disable no-tabs */
import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('test if the page has a h2 with a text', () => {
  const { getByText } = renderWithRouter(<App />);
  const text = getByText('Encountered pokémons');
  expect(text).toBeInTheDocument();
});

test('test if goes to the next pokemon when the Button was clicked', () => {
  const { getByText } = renderWithRouter(<App />);
  const button = getByText(/Próximo pokémon/i);
  expect(button).toBeInTheDocument();
});

test('test if only one Pokémon is shown at a time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemon = getAllByTestId('pokemon-name');
  expect(pokemon.length).toBe(1);
});

test('test if the Pokédex has the filter buttons', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const filterButtons = getAllByTestId('pokemon-type-button');

  filterButtons.forEach((typeButton) => {
    const pokemonType = typeButton.textContent;
    const nextButton = getByTestId('next-pokemon');
    userEvent.click(typeButton);
		expect(getByTestId('pokemonType').textContent).toBe(pokemonType);
    userEvent.click(nextButton);
	});
});

test('test if the Pokédex contains a button to reset the filter', () => {
  const { getByText } = renderWithRouter(<App />);
	const AllButton = getByText('All');
	expect(AllButton).toBeInTheDocument();
});

test('test if a filter button is created for each type of Pokémon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
	const AllButton = getByText('All');
	userEvent.click(AllButton);
	expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
});
