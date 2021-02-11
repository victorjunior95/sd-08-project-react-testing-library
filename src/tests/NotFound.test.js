import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('testing the <NotFound.js /> component', () => {
  it(`
  Test if the page contains an heading h2
   with the text Page requested not found 😭`, () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading')).toHaveTextContent(/Page requested not found 😭/i);
  });

  it(' Test if the page shows the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByAltText(/Pikachu crying because the/i).src)
      .toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
