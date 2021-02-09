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
  const text = getByText('Pikachu Details');
  expect(text).toBeInTheDocument();
  expect(pathname).toBe('/pokemons/25');

  const textDetails = getByText('Pikachu Details');
  expect(textDetails).toBeInTheDocument();
  // const pokemonLinkDetails = getByText(/more details/i);
  // expect(pokemonLinkDetails).toBeNull();
});
