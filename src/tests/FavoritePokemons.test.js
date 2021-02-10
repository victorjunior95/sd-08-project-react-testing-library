import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import { readFavoritePokemonIds } from '../services/pokedexService';

test('renders Favorite Pokémons', () => {
  const history = createMemoryHistory();
  const { getByText, container } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const favPokes = getByText(/Favorite Pokémons/i);

  fireEvent.click(favPokes);
  expect(history.location.pathname).toBe('/favorites');
  expect(favPokes).toBeInTheDocument();

  const favoritePokesList = readFavoritePokemonIds();

  if (favoritePokesList.length === 0) {
    const noFfavPokes = getByText(/No favorite pokemon found/i);
    expect(noFfavPokes).toBeInTheDocument();
  }

  if (favoritePokesList.length > 0) {
    const allFavoritePokes = container.getElementsByTagName('p');
    expect(allFavoritePokes.length).toBe(favoritePokesList.length);
  }
});
