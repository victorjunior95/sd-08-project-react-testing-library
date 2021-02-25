import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound', () => {
  it('page contains an h2 heading with the text "Page requested not found emoji"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    expect(getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    })).toBeInTheDocument();
  });
  it('page shows the image "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
