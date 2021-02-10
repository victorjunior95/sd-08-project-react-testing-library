import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

it('test if the Pokemons infomations are showed on screen', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const { name, summary } = pokemons[0];

  const pokemonLink = getByRole('link', {
    name: /more details/i,
  });
  expect(pokemonLink).toBeInTheDocument();
  userEvent.click(pokemonLink);
  const headerDetails = getByText(`${name} Details`);
  expect(headerDetails).toBeInTheDocument();
  expect(pokemonLink).not.toBeInTheDocument();
  const summaryHeaderPikachu = getByRole('heading', {
    level: 2,
    name: /summary/i,
  });
  expect(summaryHeaderPikachu).toBeInTheDocument();
  const summaryParagraph = getByText(summary);
  expect(summaryParagraph).toBeInTheDocument();
});

it('test if the page has maps and locations', () => {
  const { getByRole, getAllByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const { name, foundAt } = pokemons[0];

  const pokemonLink = getByRole('link', {
    name: /more details/i,
  });
  expect(pokemonLink).toBeInTheDocument();
  userEvent.click(pokemonLink);
  const gameLocationHeader = getByRole('heading', {
    level: 2,
    name: `Game Locations of ${name}`,
  });
  expect(gameLocationHeader).toBeInTheDocument();
  const locationsExpected = 2;
  const allLocations = getAllByAltText(`${name} location`);
  expect(allLocations.length).toBe(locationsExpected);
  const localsOfPikachu = foundAt;
  expect(allLocations[0].src).toBe(`${localsOfPikachu[0].map}`);
  expect(allLocations[1].src).toBe(`${localsOfPikachu[1].map}`);
});

it('test if users can click on checkbox', () => {
  const { getByRole, getByLabelText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemonLink = getByRole('link', {
    name: /more details/i,
  });
  expect(pokemonLink).toBeInTheDocument();
  userEvent.click(pokemonLink);
  const labelOfFavorites = getByLabelText(/Pokémon favoritado?/i);
  expect(labelOfFavorites).toBeInTheDocument();
  const clickedFavorite = getByRole('checkbox');
  userEvent.click(clickedFavorite);
  expect(clickedFavorite.value).toBe('on');
});
