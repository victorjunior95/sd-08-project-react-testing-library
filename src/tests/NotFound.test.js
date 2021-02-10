import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Contém um heading h2 com o texto "Page requested not found"', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const h2 = getByText(/Page requested not found/);
    expect(h2).toBeInTheDocument();
  });

  it('Mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
