import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';

import { NotFound } from '../components';

describe('Tests <NotFound /> component', () => {
  it('should contain a h2 tag with the text "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    expect(getByRole('heading', { name: /Page requested not found/, level: 2 }))
      .toBeInTheDocument();
  });

  it('should render a specific Pikachu gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    expect(getByAltText('Pikachu crying because the page requested was not found').src)
      .toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
