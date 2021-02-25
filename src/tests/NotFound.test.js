import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('teste not found requisito 4#', () => {
  it('este se página contém um heading h2 com o texto Page requested not found ', () => {
    const { getByRole, getByAltText } = renderWithRouter(<NotFound />);

    const getH2NotFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    const img = getByAltText('Pikachu crying because the page requested was not found');

    expect(getH2NotFound).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
