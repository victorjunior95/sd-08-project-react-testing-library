import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Verifica se a página contém um heading h2 com Page requested not found', () => {
  renderWithRouter(<NotFound />);
  const notFoundTitle = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(notFoundTitle).toBeInTheDocument();
});

test('Verifica se a página contém uma imagem', () => {
  renderWithRouter(<NotFound />);
  const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const img = screen.getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(img.src).toBe(imageURL);
});
