import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import pokemons from '../data';

describe('Test component PokemonDetails', () => {
  it('should show detailed information about the pokemon', () => {
    const NUMBER_OF_EXPECTATIONS = 3;
    expect.assertions(NUMBER_OF_EXPECTATIONS);
    const { id, name } = pokemons[0];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveTextContent(`${name} Details`);
    expect(headings[1]).toHaveTextContent('Summary');
    const about = screen.getByText(/intelligent Pokémon/gi);
    expect(about).toHaveTextContent(pokemons[0].summary);
  });

  it('should have maps pointing the location of the pokemon', () => {
    const NUMBER_OF_EXPECTATIONS = 3;
    expect.assertions(NUMBER_OF_EXPECTATIONS);
    const { id, name, foundAt } = pokemons[0];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const mapsHeading = screen.getByText(`Game Locations of ${name}`);
    expect(mapsHeading).toBeInTheDocument();
    const locations = screen.getAllByAltText(`${name} location`);
    locations.forEach((location, index) => {
      expect(location).toHaveAttribute('src', foundAt[index].map);
    });
  });

  it('should been able to favorite a pokemon', () => {
    const { id } = pokemons[0];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const checkboxFavoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkboxFavoritePokemon);
    const favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    expect(favoritePokemons[0]).toBe(id);
  });
});
