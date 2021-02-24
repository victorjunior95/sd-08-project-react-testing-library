import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('Teste do componente Pokemon', () => {
  const pokemonOne = pokemons[0];
  const favPok = true;
  const { getByTestId, getByAltText, getByText, history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemonOne }
      isFavorite={ favPok }
    />,
  );
  const { value, measurementUnit } = pokemonOne.averageWeight;
  const pokName = getByTestId('pokemon-name');
  const pokType = getByTestId('pokemonType');
  const pokWeight = getByTestId('pokemon-weight');
  const pokImg = getByAltText(`${pokemonOne.name} sprite`);
  const weightSentence = `Average weight: ${value} ${measurementUnit}`;
  const detailsLink = getByText('More details');
  const favImg = getByAltText(`${pokemonOne.name} is marked as favorite`);

  expect(pokName.innerHTML).toBe(pokemonOne.name);
  expect(pokType.innerHTML).toBe(pokemonOne.type);
  expect(pokWeight.innerHTML).toBe(weightSentence);
  expect(pokImg.src).toEqual(pokemonOne.image);
  expect(detailsLink).toBeInTheDocument();
  expect(favImg.src).toContain('/star-icon.svg');

  fireEvent.click(detailsLink);

  expect(history.location.pathname).toBe(`/pokemons/${pokemonOne.id}`);
  const detTitle = getByText('More details');

  expect(detTitle).toBeInTheDocument();
});
