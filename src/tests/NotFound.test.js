import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

test('se página tem um heading h2 com o texto Page requested not found', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const heading = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(heading).toBeInTheDocument();
});

test('se página mostra a imagem', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const getImage = getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  const urlImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(getImage.src).toBe(urlImage);
});
