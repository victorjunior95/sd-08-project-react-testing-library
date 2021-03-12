import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

const urlPokemon = '/pokemons/25';

test('the contains a heading with the text Encountered pokémons', () => {
  const history = createMemoryHistory();
  const pokemonData = pokemons;
  render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemonData[0] } isFavorite={ false } />
    </Router>,
  );

  const pokemonName = screen.getByText(/pikachu/i);
  const pokemonType = screen.getByText(/electric/i);
  const pokemonWeight = screen.getByText(/average weight: 6.0 kg/i);
  const pokemonImg = screen.getByAltText(/pikachu sprite/i);
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonImg).toBeInTheDocument();
});

test('the card has a link to the pokemon details', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const navLink = screen.getByRole('link', {
    name: /more details/i,
  });

  expect(navLink).toBeInTheDocument();
  expect(navLink).toHaveAttribute('href', '/pokemons/25');
  userEvent.click(navLink);
  expect(history.location.pathname).toBe(urlPokemon);

  const favoriteButton = screen.getByRole('checkbox');
  userEvent.click(favoriteButton);

  const favoriteAltText = 'Pikachu is marked as favorite';

  history.push('/');
  const favoritedPokemon = screen.getByAltText(favoriteAltText);
  expect(favoritedPokemon).toBeInTheDocument();
  expect(favoritedPokemon).toHaveAttribute('src', '/star-icon.svg');
  expect(favoritedPokemon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
