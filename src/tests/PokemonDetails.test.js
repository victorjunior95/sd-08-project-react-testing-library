import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import { PokemonDetails } from '../components';
import pokemons from '../data';
import App from '../App';

describe('PokemonDetails.js', () => {
  it('shows details about selected pokemon', () => {
    const { getByText, queryByText, getByRole } = renderWithRouter(
      <PokemonDetails
        match={ { params: { id: '148' } } }
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 148: true } }
        onUpdateFavoritePokemons={ () => true }
      />,
    );

    const pokemonName = getByText('Dragonair Details');
    expect(pokemonName).toBeInTheDocument();

    const favoriteLink = queryByText('More details');
    expect(favoriteLink).not.toBeInTheDocument();

    const summaryHeading = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const pokemonInfo = getByText(/they say that if it emits an aura/i);
    expect(pokemonInfo).toBeInTheDocument();
  });

  it('shows a map with pokemon location', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        match={ { params: { id: '148' } } }
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 148: true } }
        onUpdateFavoritePokemons={ () => true }
      />,
    );

    const locationsHeading = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Dragonair',
    });
    expect(locationsHeading).toBeInTheDocument();

    const firstLocationName = getByText('Johto Route 45');
    expect(firstLocationName).toBeInTheDocument();

    const secondLocationName = getByText(/Johto Dragon's Den/);
    expect(secondLocationName).toBeInTheDocument();

    const locationsMaps = getAllByAltText('Dragonair location');
    expect(locationsMaps[0].src).toContain('https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png');
    expect(locationsMaps[1].src).toContain('https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png');
  });

  it('shows a functional checkbox to favorite pokemons', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const detailsLink = getByText('More details');
    userEvent.click(detailsLink);

    const favoriteCheckbox = getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox.checked).toEqual(false);

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toEqual(true);

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toEqual(false);
  });
});
