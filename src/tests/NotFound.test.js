import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente `<NotFound.js', () => {
  it('heading `h2` com o texto `Page requested not found ', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    expect(
      getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      }),
    ).toBeInTheDocument();
  });
  it('se página mostra a imagem ', () => {
    renderWithRouter(<NotFound />);

    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
