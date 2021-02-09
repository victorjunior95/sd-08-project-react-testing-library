import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../services/renderWithRouter';

describe('Not Found page', () => {
  it('Should render a header with "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const pageNotFoundText = getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(pageNotFoundText).toBeInTheDocument();
  });

  it('Should render an image with a specific source', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const pageNotFoundImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(pageNotFoundImage.src).toBe(imageURL);
  });
});
