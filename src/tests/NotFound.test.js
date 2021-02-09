import React from 'react';
import { screen } from '@testing-library/dom';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('NotFound.js', () => {
  test('if contain a h2 heading', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('if contain a img', () => {
    renderWithRouter(<NotFound />);

    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
