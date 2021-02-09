import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

test('testing pokemon card', () => {
  const history = createMemoryHistory();
  const { getByTestId, getByAltText, getByRole, getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');

  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType).toHaveTextContent('Electric');

  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  expect(pokemonWeight).toBeInTheDocument();

  const pokemonImage = getByAltText('Pikachu sprite');
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

  const pokemonLink = getByRole('link', { name: /more details/i });
  userEvent.click(pokemonLink);
  const { pathname } = history.location;
  const text = getByText('Pikachu Details');
  expect(text).toBeInTheDocument();
  expect(pathname).toBe('/pokemons/25');
});

test('pokemon card show favorite icon and attribute', () => {
  const { getByRole, getByText, getByAltText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const pokemonLink = getByRole('link', { name: /more details/i });
  userEvent.click(pokemonLink);
  const text = getByText('Pokémon favoritado?');
  expect(text).toBeInTheDocument();

  const checkbox = getByRole('checkbox');
  userEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);

  const starIcon = getByAltText('Pikachu is marked as favorite');
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
