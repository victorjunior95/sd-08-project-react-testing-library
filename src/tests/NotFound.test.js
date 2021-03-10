import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes no componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const { getByRole } = render(<NotFound />);
      const titulo = getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      });
      expect(titulo).toBeInTheDocument();
    });

  it('Teste se a página contém a seguinte imagem', () => {
    const { getByRole } = render(<NotFound />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
