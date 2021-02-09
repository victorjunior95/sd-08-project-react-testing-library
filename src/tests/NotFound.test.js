import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound />', () => {
  test(`Teste se página contém um heading h2 com o texto Page 
requested not found 😭`, () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const regex = new RegExp('Page requested not found', 'i');
    expect(getByRole('heading', { level: 2, name: regex })).toBeInTheDocument();
  });

  test(`Teste se página mostra a imagem 
https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.`, () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const image = getByAltText(new RegExp(alt, 'i'));
    expect(image).toBeInTheDocument();
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toBe(url);
  });
});
