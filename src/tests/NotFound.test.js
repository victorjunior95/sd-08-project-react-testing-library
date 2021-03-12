import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';

import { NotFound } from '../components';

describe('testa <NotFound /> componente', () => {
  it('testando texto', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    expect(getByRole('heading', { name: /Page requested not found/, level: 2 }))
      .toBeInTheDocument();
  });

  it('aparecer gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    expect(getByAltText('Pikachu crying because the page requested was not found').src)
      .toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});