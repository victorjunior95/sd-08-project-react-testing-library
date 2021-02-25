import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('PokemonDetails', () => {
  it('detailed Pokemon information is correct', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);
    userEvent.click(buttonDetails);
    const pokemonName = getByText('Pikachu Details');
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokemonInfo = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(pokemonName).toHaveTextContent('Pikachu Details');
    expect(buttonDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonInfo).toBeInTheDocument();
  });
  it('map information displayed on the screen', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);
    userEvent.click(buttonDetails);
    const pokemonGameLocation = getByRole('heading', {
      level: 2,
      name: /Game locations of Pikachu/i,
    });
    const pokeLocations = getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(pokemonGameLocation).toBeInTheDocument();
    expect(pokeLocations.length).toBe(2);
    expect(pokeLocations[0]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
  it('the user can bookmark a pokémon through the details page', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);
    userEvent.click(buttonDetails);
    const checkbox = getByRole('checkbox');
    const label = getByText(/Pokémon favoritado?/i);
    userEvent.click(checkbox);
    expect(checkbox).toBeTruthy();
    expect(label).toBeInTheDocument();
  });
});
