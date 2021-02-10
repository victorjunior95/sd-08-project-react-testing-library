import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('REQUISITO 4', () => {
  it('Página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading', {
      level: 2, name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('Página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notfoundText = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notfoundText.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
