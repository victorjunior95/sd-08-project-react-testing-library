import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Pagina inicial', () => {
  it('URL', () => {
    const { getByRole, getByAltText } = renderWithRouter(<NotFound />);
    const h2Heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(h2Heading).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
