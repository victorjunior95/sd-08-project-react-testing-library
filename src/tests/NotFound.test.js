import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
describe('requirement 02', () => {
  test(`Teste se página contém um heading h2 com o texto 
  Page requested not found 😭`, () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    expect(getByRole('heading', { level: 2, name: /Page requested not found/i }))
      .toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imageUrl);
  });
});
