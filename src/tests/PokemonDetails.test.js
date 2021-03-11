import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

test('Verifica as informações detalhadas do Pokémon', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);

  const details = getByText(moreDetails);

  fireEvent.click(details);

  const pikachuDetails = getByText('Pikachu Details');

  const summary = getByRole('heading', {
    level: 2,
    name: 'Summary',
  });

  const paragraph = getByText(/This intelligent Pokémon/);

  expect(pikachuDetails).toBeInTheDocument();
  expect(details).not.toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});

test('Verifica se existe na página uma seção com os mapas', () => {
  const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

  const details = getByText(moreDetails);

  fireEvent.click(details);

  const pokemonMap = getByRole('heading', {
    type: 2,
    name: 'Game Locations of Pikachu',
  });

  const locationPokemon = document.querySelector('.pokemon-habitat');

  const locationOnePokemon = getAllByRole('img', {
    name: 'Pikachu location',
  })[0];

  expect(pokemonMap).toBeInTheDocument();
  expect(locationPokemon).toBeInTheDocument();
  expect(locationOnePokemon.src).toBe(
    'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
  );
});

test('Verifica se o usuário pode favoritar um pokémon', () => {
  const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);

  const details = getByText(moreDetails);

  fireEvent.click(details);

  const checkBoxView = getByRole('checkbox');
  fireEvent.click(checkBoxView);

  const favoritedPokemon = getByRole('img', {
    name: 'Pikachu is marked as favorite',
  });

  const labelText = getByLabelText('Pokémon favoritado?');

  expect(checkBoxView).toBeInTheDocument();
  expect(favoritedPokemon).toBeInTheDocument();
  expect(labelText).toBeInTheDocument();

  fireEvent.click(checkBoxView);

  expect(favoritedPokemon).not.toBeInTheDocument();
});
