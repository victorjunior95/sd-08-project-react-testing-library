import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

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
  const urlPokemon = '/pokemons/25';
  expect(navLink).toBeInTheDocument();
  expect(navLink.href).toContain(urlPokemon);
});

test('the details page contains the corret URL', () => {
  const history = createMemoryHistory();
  const container = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const navLink = container.getByRole('link', {
    name: /more details/i,
  });
  expect(navLink.href).toContain(urlPokemon);
  userEvent.click(navLink);
  expect(history.location.pathname).toBe(urlPokemon);
});

test('the star image is shown at favorited pokemons', () => {
  const history = createMemoryHistory();
  const container = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const navLink = container.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(navLink);

  const favButton = container.getByRole('checkbox');
  userEvent.click(favButton);
  const favImg = container.getByAltText('Pikachu is marked as favorite');
  expect(favImg).toBeInTheDocument();
  expect(favImg.src).toContain('/star-icon.svg');
});
