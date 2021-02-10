import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const text = screen.getByText(/Page requested not found/i);
  expect(text).toBeInTheDocument();
});

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const img = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  const imgSRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(img).toHaveAttribute('src', imgSRC);
});
