import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import Pokemon from '../components/Pokemon';

import pokemons from '../data';

const defaultPokemon = pokemons[0];

const renderPokemonWithRouter = ({
  pokemon = defaultPokemon,
  showDetailsLink = false,
  isFavorite = false,
} = {}) => (
  renderWithRouter(
    <Pokemon { ...{ pokemon, showDetailsLink, isFavorite } } />,
  )
);

describe('Tests <Pokemon /> component', () => {
  describe(`Tests if a card is renderized containing 
  information about a specific pokémon.`, () => {
    it('must show the correct `Pokémon` name.', () => {
      const { getByTestId } = renderPokemonWithRouter();

      expect(getByTestId('pokemon-name').textContent).toBe(defaultPokemon.name);
    });

    it('must show the correct `Pokémon` type.', () => {
      const { getByTestId } = renderPokemonWithRouter();

      expect(getByTestId('pokemonType').textContent).toBe(defaultPokemon.type);
    });

    it(`it must show the average weight of the Pokémon in this specific format:
    Average weight: <value> <measurementUnit>`, () => {
      const { getByTestId } = renderPokemonWithRouter();
      const { value, measurementUnit } = defaultPokemon.averageWeight;

      expect(getByTestId('pokemon-weight').textContent)
        .toBe(`Average weight: ${value} ${measurementUnit}`);
    });

    it(`must show the Pokémon image. 
    It must have a src attribute containing the URL of the image 
    with an alt attribute with the <name> sprite.`, () => {
      const { getByAltText } = renderPokemonWithRouter();

      expect(getByAltText(`${defaultPokemon.name} sprite`).src)
        .toBe(defaultPokemon.image);
    });
  });

  test(`Tests if the Pokémon card indicated on the Pokédex contains a link to
  see the details of this Pokémon. The link must have a /pokemons/<id> URL,
  where <id> is the id of the Pokémon.`, () => {
    const { getByRole } = renderPokemonWithRouter({ showDetailsLink: true });

    expect(getByRole('link', { name: /More details/i }).pathname)
      .toBe(`/pokemons/${defaultPokemon.id}`);
  });

  test(`Tests if clicking on the Pokémon link leads you to the Pokémon details page.
  Also test if the URL displayed in the browser changes to /pokemon/<id>,
  where <id> is the id of the Pokémon whose details you want to see.`, () => {
    const { getByRole, history } = renderPokemonWithRouter({ showDetailsLink: true });
    expect(history.location.pathname).toBe('/');

    userEvent.click(getByRole('link', { name: /More details/i }));
    expect(history.location.pathname)
      .toBe(`/pokemons/${defaultPokemon.id}`);
  });

  describe('Tests if there is a star icon on favorite Pokémons.', () => {
    it(`must have an image icon with the src attribute containing the path
    /star-icon.svg. The image must have an alt attribute equal to <pokemon> is marked
    as favorite, where <pokemon> is the name of the Pokémon displayed.`, () => {
      const { getByAltText } = renderPokemonWithRouter({ isFavorite: true });

      expect(getByAltText(`${defaultPokemon.name} is marked as favorite`))
        .toBeInTheDocument();

      expect(getByAltText(`${defaultPokemon.name} is marked as favorite`).src
        .match('/star-icon.svg'))
        .toBeTruthy();
    });
  });
});
