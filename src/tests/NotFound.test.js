import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  it('should have a h2 with "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should have a image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const path = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', path);
  });
});
