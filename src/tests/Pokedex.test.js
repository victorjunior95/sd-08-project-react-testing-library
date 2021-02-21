import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Pokedex component should render <h2>Encountered pokémons</h2>', () => {
  const { getByRole } = renderWithRouter(<App />);
  const headingH2 = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(headingH2).toBeInTheDocument();
});

test('The next Pokémon should be shown when "Próximo Pokémon" is clicked', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const firstPokemon = getByText(/pikachu/i);
  expect(firstPokemon).toBeInTheDocument();

  const btnNext = getByRole('button', {
    name: /próximo pokémon/i,
  });
  userEvent.click(btnNext);

  const secondPokemon = getByText(/charmander/i);
  expect(secondPokemon).toBeInTheDocument();
});

test('', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const firstPokemon = getAllByTestId('pokemon-name');
  expect(firstPokemon.length).toBe(1);
});

test('Must show only one Pokémon at a time', () => {
  const { getAllByText } = renderWithRouter(<App />);

  const pokemon = getAllByText('Pikachu');
  expect(pokemon.length).toBe(1);
});

test('Pokédex should have all filter buttons', () => {
  const { queryAllByTestId } = renderWithRouter(<App />);
  const typeButtons = queryAllByTestId('pokemon-type-button');
  const types = [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];
  expect(typeButtons.length).toBe(types.length);
  expect(typeButtons[0].textContent).toBe('Electric');
});

test('Should have a reset button', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const resetButton = getByRole('button', { name: /all/i });
  expect(resetButton).toBeInTheDocument();
  expect(resetButton).toHaveTextContent('All');

  userEvent.click(resetButton);

  expect(getByText(/pikachu/i)).toBeInTheDocument();
});
