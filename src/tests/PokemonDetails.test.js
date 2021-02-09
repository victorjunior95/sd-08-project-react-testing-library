import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

test('testing pokemon card', () => {
  const history = createMemoryHistory();
  const { getByRole, getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const pokemonLink = getByRole('link', { name: /more details/i });
  userEvent.click(pokemonLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  expect(pokemonLink).not.toBeInTheDocument();

  const heading = getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(heading).toBeInTheDocument();
  const textContain = getByText(/This intelligent Pokémon roasts/i);
  expect(textContain).toBeInTheDocument();
});

test('testing pokemon card details, maps and game locations', () => {
  const history = createMemoryHistory();
  const { getByRole, getByText, getAllByAltText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const pokemonLink = getByRole('link', { name: /more details/i });
  userEvent.click(pokemonLink);
  const { pathname } = history.location;
  const text = getByText('Pikachu Details');
  expect(text).toBeInTheDocument();
  expect(pathname).toBe('/pokemons/25');

  const heading = getByRole('heading', {
    level: 2,
    name: 'Game Locations of Pikachu',
  });
  expect(heading).toBeInTheDocument();

  const imageMap = getAllByAltText('Pikachu location');
  expect(imageMap[0]).toBeInTheDocument();
  expect(imageMap[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imageMap[1]).toBeInTheDocument();
  expect(imageMap[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('testing pokemon card contain checkbox to favorite pokemon', () => {
  const history = createMemoryHistory();
  const { getByRole, getByAltText, getByLabelText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const pokemonLink = getByRole('link', { name: /more details/i });
  userEvent.click(pokemonLink);

  const textFavorite = getByLabelText('Pokémon favoritado?');
  expect(textFavorite).toBeInTheDocument();

  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);

  const starIcon = getByAltText('Pikachu is marked as favorite');
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');

  userEvent.click(checkbox);
  expect(checkbox.checked).toEqual(false);
  expect(starIcon).not.toBeInTheDocument();
});
