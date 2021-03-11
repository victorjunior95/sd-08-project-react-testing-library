import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

const gifURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Testa o componente <NotFound />', () => {
  it('Testa o componente <NotFound> com o texto "Page requested not found"', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const textOnScreen = getByText(/Page requested not found/i);
    expect(textOnScreen).toBeInTheDocument();
  });
  it('Testa a renderização do Gif de Página não encontrada', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const altTextImg = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(altTextImg.src).toBe(gifURL);
  });
});
