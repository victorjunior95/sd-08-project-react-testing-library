import React from 'react';
import { screen } from '@testing-library/react';

import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testando NotFound', () => {
  test('Contem o  <h2> Page requested not found ', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/rotaerrada');
    const Error = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(Error).toBeInTheDocument();
  });

  test('Contem o  <img> com src:... ', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const img = getByAltText('Pikachu crying because the page requested was not found');

    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
