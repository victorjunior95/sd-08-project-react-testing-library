import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente "NotFound"', () => {
  test('a página contém um h2 com o texto "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toHaveTextContent('Page requested not found');
  });

  test('a página mostra uma imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe(imgUrl);
  });
});
