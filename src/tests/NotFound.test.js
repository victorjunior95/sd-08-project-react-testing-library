import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Component NotFound contains a heading and an image', () => {
  it('contains a heading h2 with text "Page requested not found Crying emoji"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    expect(getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    })).toBeInTheDocument();
  });
  it('contains an image "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image.src).toBe(imageLink);
  });
});
