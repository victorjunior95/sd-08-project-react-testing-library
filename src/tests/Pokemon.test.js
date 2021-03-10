import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

const POKEMON = pokemons[0];

test('test if a pokemon card is renderized', () => {
  const { getByAltText, getByTestId, getAllByRole } = renderWithRouter(<Pokemon
    pokemon={ POKEMON }
    isFavorite={ false }
  />);

  const image = getAllByRole('img');
  expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
  expect(getByTestId('pokemonType').textContent).toBe('Electric');
  expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  expect(image[0].src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('test if clicking on the details link redirects to Pokémon details page.', () => {
  const { getByText, history } = renderWithRouter(<Pokemon
    pokemon={ POKEMON }
    isFavorite={ false }
  />);
  const detailsLink = getByText(/more details/i);
  userEvent.click(detailsLink);
  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');
});

test('test if there is a Star on favorited Pokemon', () => {
  const { getByText, history, getByAltText } = renderWithRouter(<Pokemon
    pokemon={ POKEMON }
    isFavorite
  />);
  const detailsLink = getByText(/more details/i);
  userEvent.click(detailsLink);

  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');
  const starIcon = getByAltText(/pikachu is marked as favorite/i);
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
