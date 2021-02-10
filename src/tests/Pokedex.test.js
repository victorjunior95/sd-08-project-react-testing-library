import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('renders Pokedex', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const home = getByText(/Home/i);

  fireEvent.click(home);
  expect(history.location.pathname).toBe('/');

  const pokeDexTitle = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokeDexTitle).toBeInTheDocument();

  const displayingPoke = screen.getAllByTestId('pokemon-name');
  expect(displayingPoke.length).toBe(1);

  const nextPoke = pokemons.indexOf(pokemons
    .find((e) => e.name === displayingPoke[0].innerHTML)) + 1;

  const ButtonNextPoke = screen.getByTestId('next-pokemon');
  expect(ButtonNextPoke.innerHTML).toBe('Próximo pokémon');

  fireEvent.click(ButtonNextPoke);

  const newPoke = screen.getByTestId('pokemon-name').innerHTML;
  if (nextPoke > pokemons.length) {
    expect(newPoke).toBe(pokemons[0].name);
  }
  if (nextPoke <= pokemons.length) {
    expect(newPoke).toBe(pokemons[nextPoke].name);
  }

  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  expect(filterButtons[1].innerHTML).toBe('Fire');
  fireEvent.click(filterButtons[1]);

  const filteredType = screen.getByTestId('pokemonType').innerHTML;
  expect(filteredType).toBe('Fire');

  const resetButton = screen.getByText(/All/i);
  expect(resetButton).toBeInTheDocument();
  expect(resetButton.disabled).toBe(false);
  fireEvent.click(resetButton);

  const resetedPoke = screen.getByTestId('pokemon-name').innerHTML;
  expect(resetedPoke).toBe(pokemons[0].name);

  const allTypes = pokemons.map((e) => e.type).reduce((acc, curr) => {
    if (!acc.find((button) => button === curr)) {
      return [...acc, curr];
    }
    return acc;
  }, []);
  expect(filterButtons.length).toBe(allTypes.length);

  let uniqueButtons = true;
  filterButtons.reduce((acc, curr) => {
    const newAcc = [...acc, curr.innerHTML];
    if (acc.find((button) => button === curr.innerHTML)) uniqueButtons = false;
    return newAcc;
  }, []);
  expect(uniqueButtons).toBe(true);
});
