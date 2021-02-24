import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';

import PokemonDetails from '../components/PokemonDetails';

import pokemonsData from '../data';

const defaultPokemon = pokemonsData[0];

const onUpdateFavoritePokemonsMock = jest.fn(() => {});

const renderPokemonDetailsWithRouter = ({
  match = { params: { id: `${defaultPokemon.id}` } },
  pokemons = pokemonsData,
  isPokemonFavoriteById = {},
  onUpdateFavoritePokemons = onUpdateFavoritePokemonsMock,
} = {}) => (
  renderWithRouter(
    <PokemonDetails
      {
        ...{
          match,
          pokemons,
          isPokemonFavoriteById,
          onUpdateFavoritePokemons,
        }
      }
    />,
  )
);

afterEach(jest.clearAllMocks);

describe('Tests <PokemonDetails /> component', () => {
  describe(`Tests if the detailed information about the selected Pokémon
  are shown on the screen.`, () => {
    it(`must contain <name> Details text, where 
    <name> is the name of the Pokémon.`, () => {
      const { getByText } = renderPokemonDetailsWithRouter();

      expect(getByText(`${defaultPokemon.name} Details`))
        .toBeInTheDocument();
    });

    it(`must not exist navigation link for the details of the
    selected Pokémon.`, () => {
      const { queryByRole } = renderPokemonDetailsWithRouter();

      expect(queryByRole('link', { name: /More details/i }))
        .not.toBeInTheDocument();
    });

    it(`must contain an heading h2 with the text
    Summary in the details section.`, () => {
      const { getByRole } = renderPokemonDetailsWithRouter();

      expect(getByRole('heading', { level: 2, name: /Summary/i }))
        .toBeInTheDocument();
    });

    it(`it must contain a paragraph summarizing the
    specific Pokémon being viewed in the details section.`, () => {
      const { getByText } = renderPokemonDetailsWithRouter();

      expect(getByText(defaultPokemon.summary))
        .toBeInTheDocument();
    });
  });

  describe(`Tests if there is a section on the page with the maps containing the
  Pokemón locations.`, () => {
    it(`it must contain a heading h2 in the details section with the text Game
    Locations of <name>; where <name> is the name of the Pokémon displayed.`, () => {
      const { getByRole } = renderPokemonDetailsWithRouter();

      expect(getByRole('heading', { name: `Game Locations of ${defaultPokemon.name}` }))
        .toBeInTheDocument();
    });

    it(`must shown all Pokemóns locations
    in the details section.`, () => {
      const { getByText } = renderPokemonDetailsWithRouter();

      defaultPokemon.foundAt.map(({ location }) => location)
        .forEach((location) => {
          expect(getByText(location)).toBeInTheDocument();
        });
    });

    it(`must be displayed the name location and map image on each
    localization.`, () => {
      const { getByText, getAllByAltText } = renderPokemonDetailsWithRouter();

      defaultPokemon.foundAt.forEach(({ location }) => {
        expect(getByText(location)).toBeInTheDocument();
      });

      expect(getAllByAltText(`${defaultPokemon.name} location`).length)
        .toBe(defaultPokemon.foundAt.length);
    });

    it(`must contain a src attribute with the location URL
    in the location image`, () => {
      const { getAllByAltText } = renderPokemonDetailsWithRouter();

      getAllByAltText(`${defaultPokemon.name} location`)
        .forEach(({ src }) => {
          expect(defaultPokemon.foundAt.map(({ map }) => map)
            .includes(src))
            .toBeTruthy();
        });
    });

    it(`must have an alt attribute with the text <name>
    location in the location image, where <name> is the name of the Pokémon.`, () => {
      const { getAllByAltText } = renderPokemonDetailsWithRouter();

      expect(getAllByAltText(`${defaultPokemon.name} location`).length)
        .toBe(defaultPokemon.foundAt.length);
    });
  });

  describe(`Tests if there is a section on the page with the maps containing the
  Pokémon locations.`, () => {
    it(`should display a checkbox that allows you to favorite the
    Pokémon in the page.`, () => {
      const { getByLabelText } = renderPokemonDetailsWithRouter();

      const checkboxState = !getByLabelText(/Pokémon favoritado?/).checked;

      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(0);
      userEvent.click(getByLabelText(/Pokémon favoritado?/));
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(1);
      expect(onUpdateFavoritePokemonsMock)
        .toHaveBeenLastCalledWith(defaultPokemon.id, checkboxState);
    });

    it(`must add and remove - respectively - the Pokémon from the favorites list
    by clicking in the checkbox.`, () => {
      const firstPokemonDetails = renderPokemonDetailsWithRouter();
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(0);

      userEvent.click(firstPokemonDetails.getByLabelText(/Pokémon favoritado?/));
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(1);

      expect(onUpdateFavoritePokemonsMock)
        .toHaveBeenLastCalledWith(defaultPokemon.id, true);

      cleanup();
      onUpdateFavoritePokemonsMock.mockClear();

      const secondPokemonDetails = renderPokemonDetailsWithRouter({
        isPokemonFavoriteById: { [defaultPokemon.id]: true },
      });
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(0);

      userEvent.click(secondPokemonDetails.getByLabelText(/Pokémon favoritado?/));
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(1);

      expect(onUpdateFavoritePokemonsMock)
        .toHaveBeenLastCalledWith(defaultPokemon.id, false);
    });

    it('must contain a `Pokémon favoritado?` in the label of the checkbox.', () => {
      const { getByLabelText } = renderPokemonDetailsWithRouter();

      expect(getByLabelText(/Pokémon favoritado?/))
        .toBeInTheDocument();
    });
  });
});
