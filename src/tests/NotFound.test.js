import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto'
    + 'Page requested not found 😭;', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.some((img) => img.src === url)).toBe(true);
  });
});
