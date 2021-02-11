import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 03', () => {
  it('Teste 01 - Página contém um heading h2 com o texto Page requested notFound', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  it('Teste 02 - Página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gi', () => {
    renderWithRouter(<NotFound />);
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toBe(imageURL);
  });
});
