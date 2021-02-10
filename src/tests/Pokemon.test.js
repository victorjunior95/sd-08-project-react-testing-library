import React from 'react';
import userEvent from '@testing-library/user-event';
// import { render } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary:
      'This intelligent Pokémon roasts hard berries with electricity to.',
  },
];

it('test if the page has no Favorite Pokemon', () => {
  const { getByRole, queryByTestId, getByAltText, history } = renderWithRouter(<App />);
  const { averageWeight, id, image, name, type } = pokemons[0];
  const { measurementUnit, value } = averageWeight;
  const pokemonNameOnScreen = queryByTestId('pokemon-name');
  const pokemonTypeOnScreen = queryByTestId('pokemonType');
  const pokemonAverageWeightOnScreen = queryByTestId('pokemon-weight');
  const pokemonImageOnScreen = getByRole('img', {
    src: `${image}`,
  });
  const pokemonLink = getByRole('link', {
    name: /more details/i,
  });

  expect(pokemonNameOnScreen).toBeInTheDocument();
  expect(pokemonNameOnScreen.innerHTML).toBe(name);
  expect(pokemonTypeOnScreen).toBeInTheDocument();
  expect(pokemonTypeOnScreen.innerHTML).toBe(type);
  expect(pokemonAverageWeightOnScreen).toBeInTheDocument();
  expect(pokemonAverageWeightOnScreen.innerHTML).toBe(
    `Average weight: ${value} ${measurementUnit}`,
  );
  expect(pokemonImageOnScreen).toBeInTheDocument();
  expect(pokemonImageOnScreen.src).toBe(`${image}`);
  expect(pokemonImageOnScreen.alt).toBe(`${name} sprite`);

  expect(pokemonLink).toBeInTheDocument();
  userEvent.click(pokemonLink);
  const pathnamePokemon = history.location.pathname;
  expect(pathnamePokemon).toBe(`/pokemons/${id}`);

  const clickedFavorite = getByRole('checkbox');
  userEvent.click(clickedFavorite);
  expect(clickedFavorite.value).toBe('on');
  const favorites = getByAltText(`${name} is marked as favorite`);
  expect(favorites).toBeInTheDocument();
  expect(favorites.src).toBe('http://localhost/star-icon.svg');
});
