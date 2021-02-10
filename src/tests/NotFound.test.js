import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes no NotFound.js', () => {
  test('Teste se a página contém um h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    }));
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying/i);
    expect(img).toContainHTML('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
