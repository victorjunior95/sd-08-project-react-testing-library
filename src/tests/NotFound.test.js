import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByText(/Page requested not found/i);
    const img = screen.getAllByRole('img');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Page requested not found');
    expect(img[1]).toBeInTheDocument();
    expect(img[1].src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
