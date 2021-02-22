import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

// This file have gotten code contributions from Luiza Dilly
// and Ana Karine:
// https://github.com/tryber/sd-08-project-react-testing-library/pull/19/files
// https://github.com/tryber/sd-07-project-react-testing-library/pull/91/files
// Used with their express permission; this means, they are aware
// of the usage of their codes.
describe('Requirement 6', () => {
  test('if a Pokémon card is apropriately renderized', () => {
    const poke = pokemons[1];
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const name = getByText(/Charmander/i);
    expect(name).toBeInTheDocument();
  });

  test('if the type is correct', () => {
    const poke = pokemons[1];
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const type = getByText(/Fire/i);
    expect(type).toBeInTheDocument();
  });

  test('if average weight is shown', () => {
    const poke = pokemons[1];
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    expect(getByText(/average weight: 8.5 kg/i)).toBeInTheDocument();
  });

  test('if image is shown', () => {
    const poke = pokemons[1];
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const img = getByAltText('Charmander sprite');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  test('If there is a link exhibiting further Pokemon details', () => {
    const poke = pokemons[1];
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });

  test('If there is star icon on favorites Pokémons', () => {
    const poke = pokemons[1];
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite />,
    );
    const altValue = (`${poke.name} is marked as favorite`);
    const altValueData = 'Charmander is marked as favorite';
    expect(altValue).toBe(altValueData);

    const srcImage = '/star-icon.svg';
    const altImg = getByAltText(altValueData);
    expect(altImg).toHaveAttribute('src', srcImage);
  });
});
