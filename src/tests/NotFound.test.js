import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

it('test if the page has no Favorite Pokemon', () => {
  const { getByRole, getByAltText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const headingFavorite = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(headingFavorite).toBeInTheDocument();
  const imageNotFound = getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(imageNotFound).toBeInTheDocument();
  expect(imageNotFound.src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
