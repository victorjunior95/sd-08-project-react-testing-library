import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

const mockedPokemon = pokemons[0];
const { id, name, type, image, averageWeight } = mockedPokemon;
const { measurementUnit, value } = averageWeight;

describe('Testing component Pokemon.js', () => {
  test('It must render a card containing infos about the given pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mockedPokemon }
      />,
    );
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    const weightText = `Average weight: ${value} ${measurementUnit}`;
    expect(getByText(weightText)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`).src).toBe(image);
  });

  test('The pokémon\'s card must contain a link to a page with more details', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mockedPokemon }
      />,
    );
    const seeDetailsLink = getByRole('link');
    expect(seeDetailsLink.href).toBe(`http://localhost/pokemons/${id}`);
  });

  test('The favorited cards must contain a star icon', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mockedPokemon }
      />,
    );
    const starImage = getByAltText(`${name} is marked as favorite`);
    expect(starImage).toBeInTheDocument();
    expect(starImage.src).toBe('http://localhost/star-icon.svg');
  });
  // test('After clicking the link, it must redirect to the details page', () => {

  // });
});
