import { getAllByAltText, screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../RenderWithRouter';

const { getByRole } = renderWithRouter(<NotFound />);

test('Página contém um heading h2 com o texto Page requested not found 😭', () => {
  const text = getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });

  expect(text).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const img = getAllByRole('img');

  expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
