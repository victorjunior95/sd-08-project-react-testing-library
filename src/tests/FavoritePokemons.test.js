import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('if the screen shows "No favorite pokemon found".', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});

test('if it shows all the cards of favorite pokemons', () => {
  const { getAllByTestId } = renderWithRouter(
    <FavoritePokemons pokemons={ pokemons } />,
  );
  expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
});

test('if there is no favorite pokemon, there is no card', () => {
  const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  expect(queryAllByTestId('pokemon-name').length).toBe(0);
})
