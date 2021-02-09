import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

test('renders a page not found 404 with text and image', () => {
  const { getByText, getByRole, getByAltText } = renderWithRouter(<NotFound />);
  const notFoudText = getByText('Page requested not found');
  expect(notFoudText).toBeInTheDocument();
  const notFoundEmoji = getByRole('img', { name: /Crying emoji/i });
  expect(notFoundEmoji).toBeInTheDocument();
  const notFoundImage = getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
