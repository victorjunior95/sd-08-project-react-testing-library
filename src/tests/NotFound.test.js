import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('A página contém um heading h2 com o texto Page requested not found?', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole(
      'img',
      { name: /pikachu crying because the page requested was not found/i },
    );
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
