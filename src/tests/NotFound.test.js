import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('h2 with text "Page requested not found"', () => {
  const { getByText, getByRole } = renderWithRouter(<NotFound />);
  expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('Show the picture', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const image = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(image.src).toBe(src);
});
