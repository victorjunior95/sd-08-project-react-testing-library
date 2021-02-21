import React from 'react';

import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

test('test if the page has a h2 with a text', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const text = getByText('Page requested not found');
  expect(text).toBeInTheDocument();
});

test('test if the page load an image', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const image = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
