import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const msg = screen.getByText(/Page requested not found/);
    expect(msg).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imagem = document.querySelector('.not-found-image');
    const src = imagem.getAttribute('src');
    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
