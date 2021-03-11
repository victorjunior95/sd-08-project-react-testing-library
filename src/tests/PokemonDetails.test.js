import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';

test('the detailed information oh the pokemon is shown', () => {
  const history = createMemoryHistory();
  const pokemonData = pokemons;
  const container = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const detailsButton = container.getByText('More details');
  userEvent.click(detailsButton);

  const pokemonName = container.getByText(/pikachu details/i);
  expect(pokemonName).toBeInTheDocument();
  expect(detailsButton).not.toBeInTheDocument();

  const heading2 = container.getByRole('heading', {
    level: 2,
    name: /summary/i,
  });
  expect(heading2).toBeInTheDocument();

  const paragraph = container.getByText(pokemonData[0].summary);
  expect(paragraph).toBeInTheDocument();
});

test('the detail page has a map with the pokemon area details', () => {
  const history = createMemoryHistory();
  const pokemonData = pokemons;
  const container = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const detailsButton = container.getByText('More details');
  userEvent.click(detailsButton);

  const heading2 = container.getByRole('heading', {
    level: 2,
    name: /game locations of pikachu/i,
  });
  expect(heading2).toBeInTheDocument();

  const pokemonLocations = container.getAllByAltText('Pikachu location');
  expect(pokemonLocations.length).toBe(pokemonData[0].foundAt.length);
  expect(pokemonLocations[0].src).toBe(pokemonData[0].foundAt[0].map);
});

test('the pokemon can be favorited at the details page', () => {
  const history = createMemoryHistory();
  const container = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const detailsButton = container.getByText('More details');
  userEvent.click(detailsButton);

  const favButton = container.getByRole('checkbox');
  expect(favButton).toBeInTheDocument();

  const favLabel = container.getByText(/Pokémon favoritado?/i);
  expect(favLabel).toBeInTheDocument();
  userEvent.click(favButton);

  const favPokemon = container.getByAltText('Pikachu is marked as favorite');
  expect(favPokemon).toBeInTheDocument();
  userEvent.click(favButton);

  expect(favPokemon).not.toBeInTheDocument();
});
