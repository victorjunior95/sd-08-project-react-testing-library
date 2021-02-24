import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testing the NotFound.js component if the page contains', () => {
  it('an h2 heading with the text "Page requested not found Crying emoji"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const h2 = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  it('shows the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const img = getByAltText('Pikachu crying because the page requested was not found');
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imageURL);
  });
});
