import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('tests if the detailed info of the pokemon is on the screen', () => {
  const { getByRole, queryByRole, getByTestId } = render(
    <MemoryRouter initialEntries={ ['/pokemons/25'] }>
      <App />
    </MemoryRouter>,
  );
  const title = getByRole('heading', { level: 2, name: /details/i });
  expect(title).toHaveTextContent(/pikachu details/i);
  const detailsLink = queryByRole('link', { name: /more details/i });
  expect(detailsLink).toBeNull();
  const summary = getByRole('heading', { level: 2, name: /summary/i });
  expect(summary).toHaveTextContent(/summary/i);
  const details = getByTestId('paragraph');
  expect(details).toBeInTheDocument();
});

test('tests is there is a section with de maps of the pokemon location', () => {
  const { getByRole, getAllByAltText, getAllByRole } = render(
    <MemoryRouter initialEntries={ ['/pokemons/25'] }>
      <App />
    </MemoryRouter>,
  );
  const locationsTitle = getByRole('heading', { level: 2, name: /game/i });
  expect(locationsTitle).toHaveTextContent('Game Locations of Pikachu');
  const pokemonMaps = getAllByAltText(/location/i);
  expect(pokemonMaps.length).toBe(2);
  pokemonMaps.map((map) => expect(map.alt).toBe('Pikachu location'));
});
