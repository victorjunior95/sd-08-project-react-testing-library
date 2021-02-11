import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('testing the <FavoritePokemons.js /> component', () => {
  it(`If the message No favorite pokemon found is displayed on the screen,
   if the person does not have favorite pokemon.`, () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it(`If all favorite Pokémon cards are displayed.
    `, () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });

  it(`If no Pokémon card is displayed, if it is not favored.
`, () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(screen.getByText(/Ekans/i)).toBeInTheDocument(null);
    expect(screen.getByText(/Dragonair/i)).toBeInTheDocument(null);
  });
});
