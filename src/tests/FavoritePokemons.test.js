import React from 'react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import { FavoritePokemons } from '../components';

it('ckeck if ´No favorite pokemon fount´ to be in the document', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const message = getByText('No favorite pokemon found');
  expect(message).toBeInTheDocument();
});

it('check if pokemons showing on the screnn to be the expected', () => {
  const { getAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
});

it('', () => {
  const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  expect(queryAllByTestId('poke-name').length).toBe(0);
});
