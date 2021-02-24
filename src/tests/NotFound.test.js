import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import NotFound from '../components/NotFound';

test(`Teste se página contém um heading h2 com o
  texto Page requested not found 😭`, () => {
  const { container } = renderWithRouter(<NotFound />);
  const notFoundText = screen.getByRole('heading', {
    name: /Page requested not found/i,
  });
  const imgGif = container.querySelector('img').src;
  console.log(imgGif);
  const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(notFoundText).toBeInTheDocument();
  expect(imgGif).toBe(imgSrc);
});
