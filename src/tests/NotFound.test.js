import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('Testa se contem um heading h2', () => {
    const { getByText, getByRole } = renderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
    const emoji = getByRole('img', {
      name: 'Crying emoji',
    });
    expect(emoji).toBeInTheDocument();
  });

  test('Testa se a página mostra a imagem do pikachu', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const textMatch = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(img).toHaveAttribute('src', textMatch);
  });
});
