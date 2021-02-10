import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const pikachuDetailsPath = '/pokemons/25';

test('tests if the detailed info of the pokemon is on the screen', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter initialEntries={ [pikachuDetailsPath] }>
      <App />
    </MemoryRouter>,
  );
  const detailsTitle = getByRole('heading', { name: / details/i });
  expect(detailsTitle).toBeInTheDocument();
  const summary = getByRole('heading', { name: /summary/i });
  expect(summary).toBeInTheDocument();
  const summaryText = getByText(/electricity/i);
  expect(summaryText).toBeInTheDocument();
});

test('tests is there is a section with de maps of the pokemon location', () => {
  const { getByRole, getAllByAltText } = render(
    <MemoryRouter initialEntries={ [pikachuDetailsPath] }>
      <App />
    </MemoryRouter>,
  );
  const locationsTitle = getByRole('heading', { name: /game locations of pikachu/i });
  expect(locationsTitle).toBeInTheDocument();
  const pokemonMaps = getAllByAltText(/ location/i);
  expect(pokemonMaps.length).toBe(2);
  expect(pokemonMaps[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(pokemonMaps[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('tests if the favorite functionality works', () => {
  const { getByRole, getByLabelText, queryByAltText } = render(
    <MemoryRouter initialEntries={ [pikachuDetailsPath] }>
      <App />
    </MemoryRouter>,
  );
  const favoritePokemon = getByRole('checkbox');
  expect(favoritePokemon).toBeInTheDocument();
  const favoriteLabel = getByLabelText(/pokémon favoritado?/i);
  expect(favoriteLabel).toBeInTheDocument();
  let isFavorite = queryByAltText(/marked as favorite/i);
  expect(isFavorite).toBeNull();
  userEvent.click(favoritePokemon);
  isFavorite = queryByAltText(/marked as favorite/i);
  expect(isFavorite).toBeInTheDocument();
  userEvent.click(favoritePokemon);
  isFavorite = queryByAltText(/marked as favorite/i);
  expect(isFavorite).not.toBeInTheDocument();
});
