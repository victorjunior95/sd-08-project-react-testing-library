import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('tests if display message "No favorite pokemon found" if there is no fav ', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/favorites'] }>
      <App />
    </MemoryRouter>,
  );
  const notFoundFavorites = getByText(/no favorite /i);
  expect(notFoundFavorites).toBeInTheDocument();
});

test('test favorites pokemons cards on the screen', () => {
  const { getByText, getByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const detailsButton = getByText(/more details/i);
  expect(detailsButton).toBeInTheDocument();
  userEvent.click(detailsButton);
  const favCheckbox = getByRole('checkbox');
  expect(favCheckbox).toBeInTheDocument();
  userEvent.click(favCheckbox);
  const favLink = getByText(/favorite/i);
  expect(favLink).toBeInTheDocument();
  userEvent.click(favLink);
  const favPokemon = getByTestId('pokemon-name');
  expect(favPokemon).toBeInTheDocument();
});
