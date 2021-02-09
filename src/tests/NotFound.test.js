import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const tag = getByRole('heading', {
      level: 2,
      name: /page requested not found Crying emoji/i });
    expect(tag).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    const http = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img).toHaveAttribute('src', http);
  });
});
