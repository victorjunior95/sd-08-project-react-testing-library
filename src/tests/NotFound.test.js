import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o texto Page requested not found ', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundText = getByRole('heading', {
      name: /age requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { getByAltText } = renderWithRouter(<NotFound />);
    expect(getByAltText(/not found/i)).toHaveAttribute('src', imgUrl);
  });
});
