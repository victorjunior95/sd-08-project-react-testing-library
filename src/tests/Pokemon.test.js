import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { getByText, render, screen } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data'
import userEvent from '@testing-library/user-event';

test('the contains a heading with the text Encountered pokémons', () => {
  const history = createMemoryHistory();
  const pokemonData = pokemons;
  const container = render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemonData[0] } isFavorite={ false } />
    </Router>,
  );

  const pokemonName = container.getByText(/pikachu/i);
  const pokemonType = container.getByText(/electric/i);
  const pokemonWeight = container.getByText(/average weight: 6.0 kg/i);
  const pokemonImg = container.getByAltText(/pikachu sprite/i);
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonImg).toBeInTheDocument();
  });

test('the card has a link to the pokemon details', () => {
	const history = createMemoryHistory();
  const pokemonData = pokemons;
  const container = render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemonData[0] } isFavorite={ false } />
    </Router>,
  );

	const navLink = container.getByRole('link', {
		name: /more details/i,
	});
	userEvent.click(navLink);
	const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');

});
