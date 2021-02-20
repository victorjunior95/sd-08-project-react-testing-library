import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Req04 NotFound.js ', () => {
  test('Teste se têm um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const headingH2 = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(img.src).toBe(imgLink);
  });
});
