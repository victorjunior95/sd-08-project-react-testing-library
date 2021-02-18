import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemon from '../data';

test('No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('All Pokemon cards', () => {
  const { getAllByTestId, getByText } = renderWithRouter(
    <FavoritePokemons pokemons={ pokemons } />,
  );

  const pokemonsFavorites = getAllByTestId('pokemon-name');

  expect(pokemonsFavorites.length).toBe(pokemons.length);

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
