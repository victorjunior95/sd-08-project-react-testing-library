import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const pikachuPath = '/pokemons/25';

test('test if the card is on the page', () => {
  const { getByTestId, getByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');
  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType).toHaveTextContent('Electric');
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  const pokemonImg = getByRole('img');
  expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonImg.alt).toBe('Pikachu sprite');
});

test('test if there is a link to more details on the pokemon and if it works', () => {
  let testLocation;
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
      <Route
        path="*"
        render={ ({ location }) => {
          testLocation = location;
          return null;
        } }
      />
      {/* Route utilizado a partir de consulta na documentação do React Router, link: https://reactrouter.com/web/guides/testing */}
    </MemoryRouter>,
  );
  const pokemonDetailsLink = getByRole('link', { name: 'More details' });
  expect(pokemonDetailsLink.href).toContain(pikachuPath);
  userEvent.click(pokemonDetailsLink);
  expect(testLocation.pathname).toBe(pikachuPath);
});

test('test the favorite functionality on the details page', () => {
  const { getByTestId, getByRole } = render(
    <MemoryRouter initialEntries={ [pikachuPath] }>
      <App />
    </MemoryRouter>,
  );
  const favCheckbox = getByRole('checkbox');
  expect(favCheckbox).toBeInTheDocument();
  userEvent.click(favCheckbox);
  const favoriteStar = getByTestId('favorite-star');
  expect(favoriteStar).toBeInTheDocument();
  expect(favoriteStar.src).toContain('/star-icon.svg');
  expect(favoriteStar.alt).toBe('Pikachu is marked as favorite');
});
