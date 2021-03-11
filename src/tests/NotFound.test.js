import React from 'react';
// import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Contém um heading h2 com o texto Page requested not found 😭', () => {
  const { getByRole } = render(<NotFound />);
  const info = getByRole('heading', {
    level: 2,
  });
  expect(info.textContent).toBe('Page requested not found 😭 ');
});

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const { getAllByRole } = render(<NotFound />);
  const imagemPokedex = getAllByRole('img');
  expect(imagemPokedex[1].src).toBe(SRC);
});
