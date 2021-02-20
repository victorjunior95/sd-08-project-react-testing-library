import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('NotFound.js', () => {
  test('Testa se a página contém um heading', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const pageTxt = getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(pageTxt).toBeInTheDocument();
  });

  test('Testando src da imagem', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
