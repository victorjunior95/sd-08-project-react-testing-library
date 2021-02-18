import React from 'react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

import pokemons from '../data';

describe('testes do FavoritePokemons', () => {
  it('teste1: mensagem de No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('All favorite Pokémon cards should be displayed.', () => {
    const { getAllByTestId, getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const NINENINE = 9;

    const pokemonsFavorites = getAllByTestId('pokemon-name');

    expect(pokemonsFavorites.length).toBe(NINENINE);

    const pikachu = getByText('Pikachu');
    const charmander = getByText('Charmander');
    const caterpie = getByText('Caterpie');
    const ekans = getByText('Ekans');
    const alakazam = getByText('Alakazam');
    const mew = getByText('Mew');
    const rapidash = getByText('Rapidash');
    const snorlax = getByText('Snorlax');
    const dragonair = getByText('Dragonair');

    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
    expect(alakazam).toBeInTheDocument();
    expect(mew).toBeInTheDocument();
    expect(rapidash).toBeInTheDocument();
    expect(snorlax).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
  });
});
