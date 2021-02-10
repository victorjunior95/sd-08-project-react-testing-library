import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('verifica heading e img na pagina NotFound', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const aboutOnly = getByText(/Page requested not found/i);
  expect(aboutOnly).toBeInTheDocument();

  const imgAbout = screen.getAllByRole('img', {
    alt: /Pikachu crying because the page requested was not found/i,
  });
  expect(imgAbout[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
