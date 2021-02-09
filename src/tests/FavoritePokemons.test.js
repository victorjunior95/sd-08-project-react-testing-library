import React from 'react';

import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('pokemon favoritado', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <FavoritePokemons />
    </Router>,
  );
  const noFavPoke = screen.getByText(
    'No favorite pokemon found',
  );
  expect(noFavPoke).toBeInTheDocument();
  const Favorites = [pokemons[0], pokemons[1]];
  const pokemonsz = screen.queryByText(<FavoritePokemons pokemons={ Favorites } />);

  expect(pokemonsz).not.toBeInTheDocument();
});

test('pokemon outro', () => {
  const pokeFav = [pokemons[0], pokemons[1]];
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <FavoritePokemons pokemons={ pokeFav } />
    </Router>,
  );

  const pikachu = screen.getByText('Pikachu');
  const charmander = screen.getByText('Charmander');
  expect(pikachu).toBeInTheDocument();
  expect(charmander).toBeInTheDocument();
});
