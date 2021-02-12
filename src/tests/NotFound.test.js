import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto'
    + 'Page requested not found 😭;', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const image = screen.getAllByRole('img');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.some((img) => img.src === url)).toBe(true);
  });
});
