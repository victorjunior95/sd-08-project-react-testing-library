import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('if the page contains a heading h2 with the text "Encountered pokémons" ', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('if the text of the button is "Próximo Pokémon"', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Próximo pokémon')).toBeInTheDocument();
});

test('if as the button is clicked the next pokémon is shown', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonNext = getByText('Próximo pokémon');
  pokemons.forEach((pokemon) => {
    expect(getByText(pokemon.name)).toBeInTheDocument();
    userEvent.click(buttonNext);
  });
});

test('if only one pokemon is shown at a time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

test('if there is a filter button to types of Pokémon', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const pkmnFilter = getAllByTestId('pokemon-type-button');
  pkmnFilter.forEach((type) => {
    const pkmnType = type.textContent;
    const buttonNext = getByTestId('next-pokemon');
    userEvent.click(type);
    expect(getByTestId('pokemonType').textContent).toBe(pkmnType);
    userEvent.click(buttonNext);
  });
});

test('if theres is a filter reset button with the text "All"', () => {
  const { getByText } = renderWithRouter(<App />);
  const allPkmn = getByText('All');
  expect(allPkmn).toBeInTheDocument();
});

test('if the pokédex shows all pokémons as the button "All" is clicked', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const allPkmn = getByText('All');
  userEvent.click(allPkmn);
  expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
});
