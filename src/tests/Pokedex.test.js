import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('test if the page has a h2 with Encountered Pokémons text', () => {
  const { getByText } = renderWithRouter(<App />);
  const text = getByText('Encountered pokémons');
  expect(text).toBeInTheDocument();
});

test('test if pass to the next pokemon when the Button is clicked', () => {
  const { getByText } = renderWithRouter(<App />);
  const btn = getByText(/Próximo pokémon/i);
  expect(btn).toBeInTheDocument();
});

test('test if shows only one pokemon at a time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemon = getAllByTestId('pokemon-name');
  expect(pokemon.length).toBe(1);
});

test('test if the Pokédex has filter buttons', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const filterBtns = getAllByTestId('pokemon-type-button');

  filterBtns.forEach((typeButton) => {
    const pokemonType = typeButton.textContent;
    const nextBtn = getByTestId('next-pokemon');
    userEvent.click(typeButton);
    expect(getByTestId('pokemonType').textContent).toBe(pokemonType);
    userEvent.click(nextBtn);
  });
});

test('test if the Pokédex has a reset button to the filters', () => {
  const { getByText } = renderWithRouter(<App />);
  const AllBtn = getByText('All');
  expect(AllBtn).toBeInTheDocument();
});

test('test if a filter button is created for each type of Pokémon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const AllBtn = getByText('All');
  userEvent.click(AllBtn);
  expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
});
