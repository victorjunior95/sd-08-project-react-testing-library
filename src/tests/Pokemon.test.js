import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('tests all data receveid of a pokémon', () => {
  const pikachuTest = pokemons[0];
  test('Pokemon name', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pikachuTest } isFavorite />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe(pikachuTest.name);
  });
  test('Pokemon type', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pikachuTest } isFavorite />,
    );
    const pokemontype = getByTestId('pokemonType');
    expect(pokemontype).toBeInTheDocument();
    expect(pokemontype.textContent).toBe(pikachuTest.type);
  });
  test('Pokemon weigth', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pikachuTest } isFavorite />,
    );
    const pokemonweigth = getByTestId('pokemon-weight');
    expect(pokemonweigth).toBeInTheDocument();
    expect(pokemonweigth.textContent).toBe('Average weight: 6.0 kg');
  });
  test('Pokemon image', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pikachuTest } isFavorite />,
    );
    const pokemonImg = getByAltText(`${pikachuTest.name} sprite`);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe(pikachuTest.image);
  });
  test('test the more details link', () => {
    const { getByRole, container, history } = renderWithRouter(
      <Pokemon pokemon={ pikachuTest } isFavorite />,
    );
    const moreDetailsLink = getByRole('link', { name: /more details/i });
    const pokedexDiv = container.getElementsByClassName('pokemon')[0];
    expect(pokedexDiv).toContainElement(moreDetailsLink);
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${pikachuTest.id}`);

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pikachuTest.id}`);
  });
  test('test the favorite pokemon image', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pikachuTest } isFavorite />,
    );
    const favoriteIconAlt = getByAltText(`${pikachuTest.name} is marked as favorite`);
    expect(favoriteIconAlt.src).toBe('http://localhost/star-icon.svg'); // Isso fica bem estranho, creio que tenha alguma forma melhor de fazer
  });
});
