import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('the page contains a heading with the text Page requested not found 😭', () => {
  render(<NotFound />);
  const notFoundHeading = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(notFoundHeading).toBeInTheDocument();
});

test('the page show the not found image', () => {
  render(<NotFound />);
  const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const altText = 'Pikachu crying because the page requested was not found';
  const notFoundImage = screen.getByAltText(altText);
  expect(notFoundImage.src).toBe(imgSrc);
  expect(notFoundImage).toBeInTheDocument();
});
