import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import FavoritePokemons from '../components/FavoritePokemons';

test('pokemon favoritado', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <FavoritePokemons />
    </Router>,
  );
  const noFavPoke = screen.getByText(
    /No fav/i,
  );
  expect(noFavPoke).toBeInTheDocument();
});
