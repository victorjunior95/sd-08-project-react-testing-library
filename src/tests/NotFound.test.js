import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa componente <NotFound />', () => {
  it('Testa se a mensagem de Pagina não encontrada renderiza', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const textOnScreen = getByText(/Page requested not found/i);
    expect(textOnScreen).toBeInTheDocument();
  });

  it('Testa se o Gif de Pagina não encontrada renderiza', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const altTextImg = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    const gifURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(altTextImg.src).toBe(gifURL);
  });
});
