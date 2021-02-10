import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByText, getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    const headingText = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
    expect(headingText).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
