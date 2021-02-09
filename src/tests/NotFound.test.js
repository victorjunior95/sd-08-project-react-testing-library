import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('1- A página deve apresentar cabeçalho e imagem especifica.', () => {
  it('A página deve conter o texto "Page requested not found".', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heading = getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });
  it('A página deve conter uma imagem específica.', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const path = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagePath = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imagePath.src).toBe(path);
  });
});
