import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

test('shows the message No favorite pokemon found if no pokemons are found', () => {
  render(<FavoritePokemons />);
  const noPokemons = screen.getByText(/No favorite pokemon found/i);
  expect(noPokemons).toBeInTheDocument();
});

test('the favorite pokemons cards are shown', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const detailsButton = screen.getByText(/more details/i);
  userEvent.click(detailsButton);

  const favoriteButton = screen.getByRole('checkbox');
  userEvent.click(favoriteButton);

  const favoritePage = screen.getByText(/favorite pokémons/i);
  userEvent.click(favoritePage);

  const favoritedPokemons = screen.getAllByTestId('pokemon-name').length;
  expect(favoritedPokemons).toBe(1);
});
