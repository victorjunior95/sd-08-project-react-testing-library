import React from 'react';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources };
};

const PATH = '/pokemons/25';

test('Test if the details information about Pokemon are shown in the screen', () => {
  const { getByText } = renderPath(PATH);

  const heading = getByText(/Pikachu Details/i);
  expect(heading).toBeInTheDocument();

  const headingSummary = getByText(/Summary/i);
  expect(headingSummary).toBeInTheDocument();

  const paragraph1 = getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(paragraph1).toBeInTheDocument();

  const paragraph2 = getByText(/with electricity to make them tender enough to eat./i);
  expect(paragraph2).toBeInTheDocument();
});

test('Test if there is in the page a section with maps with the locations', () => {
  const { getByText, getAllByRole } = renderPath(PATH);

  const GameLocation = getByText(/Game Locations of Pikachu/i);
  expect(GameLocation).toBeInTheDocument();

  const PikachuLocation1 = getByText(/Kanto Viridian Forest/);
  expect(PikachuLocation1).toBeInTheDocument();
  const PikachuLocation2 = getByText(/Kanto Power Plant/);
  expect(PikachuLocation2).toBeInTheDocument();

  const PokemonsImage = getAllByRole('img');
  expect(PokemonsImage[1]).toHaveAttribute('alt', 'Pikachu location');
  expect(PokemonsImage[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(PokemonsImage[2]).toHaveAttribute('alt', 'Pikachu location');
  expect(PokemonsImage[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('Test if the user can favorite a Pokemon in the Details page', () => {
  const { getByRole, getByLabelText } = renderPath(PATH);

  const PokemonFavorite = getByRole('checkbox');
  expect(PokemonFavorite).toBeInTheDocument();
  const label = getByLabelText(/Pokémon favoritado?/i);
  expect(label).toBeInTheDocument();
});
