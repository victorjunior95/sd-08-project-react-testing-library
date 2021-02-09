import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  test('Verifica conteúdo da página notFound', () => {
    const { getByRole, getByAltText } = renderWithRouter(<NotFound />);
    const title = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(title).toBeInTheDocument();
    const img = getByAltText(/Pikachu crying/);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
