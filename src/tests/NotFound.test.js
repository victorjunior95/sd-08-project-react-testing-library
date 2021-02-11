import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4 - Teste o componente \\"NotFound"\\', () => {
  it(`Teste se página contém um heading h2 com o texto
    Page requested not found 😭;`,
  () => {
    const { getByRole } = render(<NotFound />);
    expect(getByRole('heading', {
      name: /page requested not found/i,
    })).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.',
    () => {
      const { getByRole } = render(<NotFound />);
      const imgNotFound = getByRole('img', {
        name: /pikachu crying because the page requested was not found/i,
      });
      expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
