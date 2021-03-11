import React from 'react';
import renderWithRouter from '../services/renderWithRouter';

import { NotFound } from '../components';

describe('NotFound.js', () => {
  test('should render a heading with the text `Page requested not found`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const notFoundHeading = getByRole('heading', {
      level: 2,
    });

    expect(notFoundHeading).toHaveTextContent('Page requested not found 😭');
  });

  test('if page requested notfound should render a img with a pikachu crying gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const cryingPikachu = getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(cryingPikachu.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
