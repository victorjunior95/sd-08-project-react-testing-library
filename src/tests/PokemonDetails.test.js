import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';

import { PokemonDetails } from '../components';
import pokemons from '../data';
import App from '../App';

describe('PokemonDetails.js', () => {
  test('should show the details about the selected pokemon', () => {
    const { getByText, queryByText, getByRole } = renderWithRouter(
      <PokemonDetails
        match={ { params: { id: '10' } } }
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 10: true } }
        onUpdateFavoritePokemons={ () => true }
      />,
    );

    const pokemonName = getByText('Caterpie Details');
    expect(pokemonName).toBeInTheDocument();

    const pokemonDetailsLink = queryByText('More details');
    expect(pokemonDetailsLink).not.toBeInTheDocument();

    const summaryHeading = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const pokemonSummaryInfo = getByText(/For protection, it releases a horrible/i);
    expect(pokemonSummaryInfo).toBeInTheDocument();
  });

  test('should show a section with the maps of the pokemon locations', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        match={ { params: { id: '10' } } }
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 10: true } }
        onUpdateFavoritePokemons={ () => true }
      />,
    );

    const mapLocationsHeading = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Caterpie',
    });
    expect(mapLocationsHeading).toBeInTheDocument();

    const firstLocationName = getByText('Johto Route 30');
    expect(firstLocationName).toBeInTheDocument();

    const secondLocationName = getByText('Johto Route 31');
    expect(secondLocationName).toBeInTheDocument();

    const pokemonLocationMap = getAllByAltText('Caterpie location');
    expect(pokemonLocationMap[0].src).toContain('https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png');
    expect(pokemonLocationMap[1].src).toContain('https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png');
  });

  test('should show a functional checkbox so user can check favorite pokemons', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const pokemonDetailsLink = getByText('More details');
    userEvent.click(pokemonDetailsLink);

    const favoritePokemonCheckbox = getByLabelText(/^Pokémon favoritado?/);
    expect(favoritePokemonCheckbox).toBeInTheDocument();
    expect(favoritePokemonCheckbox.checked).toEqual(false);

    userEvent.click(favoritePokemonCheckbox);
    expect(favoritePokemonCheckbox.checked).toEqual(true);

    userEvent.click(favoritePokemonCheckbox);
    expect(favoritePokemonCheckbox.checked).toEqual(false);
  });
});

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
// /^A/
// /A/i
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
// https://testing-library.com/docs/react-testing-library/cheatsheet/
