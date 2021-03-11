import React from 'react';
import { Router } from 'react-router-dom';

import App from '../App';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';

test('the page contains a heading with the text Encountered pokémons', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const pokedexHeading = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokedexHeading).toBeInTheDocument();
});

test('the next pokemon is shown when clicking Próximo pokémon', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const getById = screen.getByTestId('pokemon-name').textContent;
  const initialPokemon = getById;
  expect(initialPokemon).toBe('Pikachu');

  const nextButton = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  userEvent.click(nextButton);

  const nextPokemon = getById;
  expect(nextPokemon).toBe('Charmander');

  const pokemonCards = screen.getAllByTestId('pokemon-name').length;
  expect(pokemonCards).toBe(1);

  const pokedexHeading = screen.getByText(/Encountered pokémons/i);
  expect(pokedexHeading).toBeInTheDocument();
});
