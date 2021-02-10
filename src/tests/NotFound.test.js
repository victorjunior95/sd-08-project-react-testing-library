import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound compent test', () => {
  it('Not found page should contain an h2 with text Page requested not found 😭.', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(heading).toBeInTheDocument();
  });

  it('The not found page should contain a image with the following link: https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const image = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image.src).toBe(src);
  });
});
