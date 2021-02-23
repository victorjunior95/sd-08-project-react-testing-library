import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { Not Found } from '../components';

test('test if the page has h2 with not found text', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const text = getByText('Page requested not found');
  expect(text).toBeInTheDocument();
});

test('test if the page shows an an specific image', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const image = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
