import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';
import { Pokemon } from '../components';

const pkmn = pokemons[5];

test('if it shows the pokemon card', () => {
  const { getByText, getByRole, getByAltText } = renderWithRouter(<Pokemon
    pokemon={ pkmn }
    isFavorite={ false }
  />);
  const img = 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png';

  expect(getByText(/mew/i)).toBeInTheDocument();
  expect(getByText(/psychic/i)).toBeInTheDocument();
  expect(getByText(/average weight: 4.0 kg/i)).toBeInTheDocument();
  expect(getByRole('img').src).toBe(img);
  expect(getByAltText('Mew sprite')).toBeInTheDocument();
});

test('if there is a details link', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ pkmn }
    isFavorite={ false }
  />);
  const details = getByRole('link', { name: /more details/i });
  expect(details).toBeInTheDocument();
  expect(details.href).toContain('/pokemons/151');
});

test('if the link is functional', () => {
  const { getByRole, getByText, history } = renderWithRouter(<App />);
  const details = getByRole('link', { name: /more details/i });
  userEvent.click(details);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  expect(getByText('Pikachu Details')).toBeInTheDocument();
});

test('if there is a star in case of favorited pokemon', () => {
  const { getByRole } = renderWithRouter(<Pokemon pokemon={ pkmn } isFavorite />);
  const favorite = getByRole('img', { name: /mew is marked as favorite/i });
  expect(favorite).toBeInTheDocument();
  expect(favorite.src).toContain('star-icon.svg');
});
