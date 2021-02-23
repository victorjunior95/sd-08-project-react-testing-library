import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

test('test if shows a message when the person has no favorite pokemon', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const message = getByText('No favorite pokemon found');
  expect(message).toBeInTheDocument();
});

test('test if shows all favorites pokemons cards', () => {
  const { getAllByTestId } = renderWithRouter(
    <FavoritePokemons pokemons={ pokemons } />,
  );
  expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
});

test('test if there is no card when does not have a favorite pokemon', () => {
  const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  expect(queryAllByTestId('poke-name').length).toBe(0);
});
