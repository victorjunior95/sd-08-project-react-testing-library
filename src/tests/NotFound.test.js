import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('test notfound.js', () => {
  it('title test', () => {
    renderWithRouter(<NotFound />);

    const titleText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(titleText).toBeInTheDocument();
  });

  it('image page', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', {
      name: /Pikachu/i,
    });

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
