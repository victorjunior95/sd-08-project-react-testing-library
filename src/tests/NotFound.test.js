import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('teste', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const textPage = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(textPage).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const pathImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getByAltText(/Pikachu crying/i);

    expect(image).toHaveAttribute('src', pathImage);
  });
});
