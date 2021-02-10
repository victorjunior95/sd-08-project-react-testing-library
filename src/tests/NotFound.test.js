import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './renderWithRouter';

describe('Testando o componente <NotFound.js />', () => {
  it('Testando se pág tem um heading h2 e texto Page requested not found 😭', () => {
    RenderWithRouter(<NotFound />);

    const pokeTitle = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });

    expect(pokeTitle).toBeInTheDocument();
  });

  it('Testando se página mostra a imagem', () => {
    RenderWithRouter(<NotFound />);
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pokeImg = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(pokeImg.src).toBe(link);
  });
});
