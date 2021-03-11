import React from 'react';
// import { render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

// Será avaliado se o arquivo teste NotFound.test.js contemplam 100% dos casos de uso criados pelo Stryker.
describe('NotFound.js - the page:', () => {
  // Teste se página contém um heading h2 com o texto Page requested not found;
  test('Contains an h2 heading with the text Page request not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const text = getByText('Page request not found', {
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });

  // Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.
  test(`The page shows the image
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img).toHaveAttribute('src', URL);
  });
});
