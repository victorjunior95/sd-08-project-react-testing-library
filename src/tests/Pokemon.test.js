import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import App from '../App';
import pokemons from '../data';

const pokemonsRoll = pokemons;
const { id, name, type,
  averageWeight: { value, measurementUnit }, image } = pokemonsRoll[0];

describe('testing the <Pokemon.js /> component', () => {
  test('If a card with the information of a certain Pokémon is rendered.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonsRoll[0] }
        isFavorite={ App.setIsPokemonFavoriteById()[id] }
      />,
    );
    expect(screen.getByTestId('pokemon-name')).toContainHTML((name));
    expect(screen.getByTestId('pokemonType')).toContainHTML(type);
    expect(screen.getByTestId('pokemon-weight')).toContainHTML(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(screen.getByAltText(`${name} sprite`).src).toBe(image);
  });

  test(`If the Pokémon card indicated on the Pokédex contains
   a navigation link to view details of this Pokémon.
   The link must have the URL / pokemons / <id>,
   where <id> is the id of the Pokémon displayed`, () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonsRoll[0] }
        isFavorite={ App.setIsPokemonFavoriteById()[id] }
      />,
    );
    expect(screen.getByText('More details')).toHaveAttribute(
      'href',
      `/pokemons/${id}`,
    );
  });

  test(`If clicking on the Pokémon's navigation 
  link redirects the application to the Pokémon details page.`, async () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonsRoll[0] }
        isFavorite={ App.setIsPokemonFavoriteById()[id] }
      />,
    );
    fireEvent.click(screen.getByRole('link', { href: `/pokemons/${id}` }));
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test(`If the URL displayed in the browser
  changes to / pokemon / <id>, where <id> is the id of
  the Pokémon whose details you want to see.`, () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonsRoll[0] }
        isFavorite={ App.setIsPokemonFavoriteById()[id] }
      />,
    );
    fireEvent.click(screen.getByRole('link', { href: `/pokemons/${id}` }));
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('If there is a star icon on favorite Pokémon.', () => {
    const favoritePokemons = true;
    renderWithRouter(
      <Pokemon pokemon={ pokemonsRoll[0] } isFavorite={ favoritePokemons } />,
    );
    expect(screen.getByAltText(`${name} is marked as favorite`).src).toContain(
      '/star-icon.svg',
    );
  });
});
