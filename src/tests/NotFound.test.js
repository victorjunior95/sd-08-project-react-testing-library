import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

test('if the page has a heading h2 with the text "Page requested not found"', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const notFound = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(notFound).toBeInTheDocument();
});

test('if the page shows the image of the source', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const notFound = getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(notFound.src).toBe(img);
});
