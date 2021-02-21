import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa Component NotFound', () => {
  test('página contém um heading h2 com o texto Page requested not found',
    () => {
      render(
        <NotFound />,
      );
      const headingh2 = screen.getByRole('heading', {
        level: 2,
        name: 'Page requested not found Crying emoji',
      });
      expect(headingh2).toBeInTheDocument();
    });
  test('Verifica se a página carrega a imagem ', () => {
    render(<NotFound />);
    const image = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
