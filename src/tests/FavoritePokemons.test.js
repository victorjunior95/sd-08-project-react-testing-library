import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

it('test if the page has no Favorite Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const headingFavorite = getByText(/No favorite pokemon found/);
  expect(headingFavorite).toBeInTheDocument();
});
