import React from 'react';
// import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  const { getByRole } = render(<NotFound />);
  const info = getByRole('heading', {
    level: 2,
  });
  expect(info.textContent).toBe('Page requested not found 😭');
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  const SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const { getAllByRole } = render(<NotFound />);
  const imagemPokedex = getAllByRole('img');
  expect(imagemPokedex[1].src).toBe(SRC);
});
