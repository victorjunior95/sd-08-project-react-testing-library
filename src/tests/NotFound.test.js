import React from 'react';
// import {  } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('testando página não existente', () => {
  const { getByText, getByAltText } = renderWithRouter(<NotFound />);

  const noPage = getByText('Page requested not found');
  const img = getByAltText('Pikachu crying because the page requested was not found');

  expect(noPage).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
