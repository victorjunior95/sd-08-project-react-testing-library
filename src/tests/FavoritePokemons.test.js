import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemon from '../data';

test('No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('All Pokemon cards', () => {
  const favpokemon = [pokemon[0], pokemon[1]];
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favpokemon } />);
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByText('Charmander')).toBeInTheDocument();
});
