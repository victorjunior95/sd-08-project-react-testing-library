import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('test the content of about favorite', () => {
  test('test case has not favorite pokémons ', () => {
    const ZERO = 0;
    const { getByText, container } = render(<FavoritePokemons />);
    const noFavorite = getByText('No favorite pokemon found');
    const favoritePokemons = container.getElementsByClassName('favorite-pokemons').length;
    expect(favoritePokemons).toBe(ZERO);
    expect(noFavorite).toBeInTheDocument();
  });
  test('test if every favorite pokemon car exist ', () => {
    const selectedPokemons = [pokemons[0], pokemons[1]]; // Pikachu and Charmander on data.js.
    const { container } = renderWithRouter(
      <FavoritePokemons pokemons={ selectedPokemons } />,
    );
    const favoritePokemons = container.getElementsByClassName('favorite-pokemon').length;
    expect(favoritePokemons).toBe(selectedPokemons.length);
  });
  test('tests if no pokemon is displayed if no pokemon is selected', () => {
    const ZERO = 0;
    const { container } = renderWithRouter(<FavoritePokemons />);
    const favoritePokemons = container.getElementsByClassName('favorite-pokemons').length;
    expect(favoritePokemons).toBe(ZERO);
  });
});
