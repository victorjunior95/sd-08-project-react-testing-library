import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

const pokemonTest = pokemons[0];
const isFavorite = true;
const imageAlt = 'Pikachu sprite';

describe('Requisito 6, Pokemon.js', () => {
  test('Should be displayed infomations about a pokemon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonTest }
        isFavorite={ isFavorite }
      />,
    );
    const pokemonName = getByText('Pikachu').innerHTML;
    const pokemonType = getByText('Electric').innerHTML;
    const pokemonWeight = getByText(/average weight: 6.0 kg/i);
    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonName).toBe('Pikachu');
    expect(pokemonType).toBe('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe(imageAlt);
  });
  test('Must have a specific pathname', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonTest }
        isFavorite={ isFavorite }
      />,
    );
    const detailsLink = getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('There should be a image if liked', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonTest }
        isFavorite={ isFavorite }
      />,
    );
    const startImage = getByAltText('Pikachu is marked as favorite');
    expect(startImage).toBeInTheDocument();
    expect(startImage.src).toBe('http://localhost/star-icon.svg');
  });
});
