import React from 'react';
// import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('test pokemon card', () => {
  it('testing pokemon details', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const pokemonName = getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(/electric/i);

    const pokemonWeight = getByText(/6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonSprite = getByAltText(/pikachu sprite/i);
    expect(pokemonSprite).toBeInTheDocument();
  });
});

describe('test pokemon card', () => {
  it('testing link to details', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const detailsLink = getByRole('link');
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });
});
