import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

// unpleasant "No magic number" esLint rule.
const length = 4;
const magicFluckingNumber = 25;
const favorited = pokemons.filter((pok) => pok.id <= magicFluckingNumber);

describe('Requirement 3, testing favorite pokemons', () => {
  test('If there is no favorite pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('If favored cards are exhibited', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ favorited } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(length);
  });

  test('If non favored cards are non exhibited.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ favorited } />);
    expect(queryByText('Snorlax', 'Dragonair')).not.toBeInTheDocument();
  });
});
