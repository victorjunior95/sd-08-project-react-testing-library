import React from 'react';
import renderWithRouter from '../services/renderWithRouter';

import { NotFound } from '../components';

describe('NotFound.js', () => {
  it('shows NotFound heading', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const notFoundHeading = getByRole('heading', {
      level: 2,
    });
    expect(notFoundHeading).toHaveTextContent('Page requested not found 😭');
  });

  it('shows a pikachu gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const aboutImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(aboutImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
