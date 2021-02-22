import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

it('check if the message `Page requested not found` exist in the document', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const message = getByText('Page requested not found');
  expect(message).toBeInTheDocument();
});

it('check if the SCR from image to equal', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const img = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});


