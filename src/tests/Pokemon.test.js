import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import pokemons from '../data';

describe('Test component Pokemon', () => {
  const TESTID_POKEMON_NAME = 'pokemon-name';
  const TESTID_POKEMON_TYPE = 'pokemonType';
  const TESTID_POKEMON_WEIGHT = 'pokemon-weight';

  it('should render the correct card for the pokemon', () => {
    renderWithRouter(<App />);
    const NUMBER_OF_EXPECTATIONS = 5;
    expect.assertions(NUMBER_OF_EXPECTATIONS);
    const pokemonName = screen.getByTestId(TESTID_POKEMON_NAME).innerHTML;
    expect(pokemonName).toBe(pokemons[0].name);
    const pokemonType = screen.getByTestId(TESTID_POKEMON_TYPE).innerHTML;
    expect(pokemonType).toBe(pokemons[0].type);
    const pokemonWeight = screen.getByTestId(TESTID_POKEMON_WEIGHT).innerHTML;
    const weightString = `Average weight: ${
      pokemons[0].averageWeight.value
    } ${pokemons[0].averageWeight.measurementUnit}`;
    expect(pokemonWeight).toBe(weightString);
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage).toHaveAttribute('src', pokemons[0].image);
    expect(pokemonImage).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
  });

  it('should have a link to the details page of that pokemon', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByText('More details');
    expect(linkMoreDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  it('should redirect to the details page of the right pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByText('More details');
    fireEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('should have an image if favorited', () => {
    expect.assertions(2);
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const btnFavoritePokemon = screen.getByRole('checkbox');
    fireEvent.click(btnFavoritePokemon);
    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(images[1]).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
