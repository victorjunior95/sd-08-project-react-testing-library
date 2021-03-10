import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import { Router } from 'react-router';


test('the message No favorite pokemon found is shown if there is no favorite pokemons', () => {
  render(<FavoritePokemons />)
  const noPokemons = screen.getByText(/No favorite pokemon found/i);
  expect(noPokemons).toBeInTheDocument();
});

test('the message No favorite pokemon found is shown if there is no favorite pokemons', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const detailsButton = screen.getByText(/more details/i);
  userEvent.click(detailsButton);

  const favoriteButton = screen.getByRole('checkbox');
  userEvent.click(favoriteButton);

  const favoritePage = screen.getByText(/favorite pokémons/i)
  userEvent.click(favoritePage);

  const favoritedPokemons = screen.getAllByTestId('pokemon-name').length;
  expect(favoritedPokemons).toBe(1);

});
