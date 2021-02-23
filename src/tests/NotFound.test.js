import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Req 04', () => {
  test('Se página contém um heading h2 com o texto Page requested not found ', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
