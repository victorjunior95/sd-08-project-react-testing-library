import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste NotFound.js', () => {
  it('testa se exibe um "h2" com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent('Page requested not found 😭');
  });
  it('testa se exibe uma imagem específica', () => {
    const IMAGE = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { container } = renderWithRouter(<NotFound />);
    expect(container.getElementsByClassName('not-found-image')[0].src)
      .toBe(IMAGE);
  });
});
