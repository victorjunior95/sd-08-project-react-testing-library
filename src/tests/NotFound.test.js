import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('NotFound.js', () => {
  it('page contains an h2 heading with the text Page requested not found 😭', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFound />);
    const noMatch = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(noMatch).toBeInTheDocument();

    const cryingEmoji = getByText(/😭/i);
    expect(cryingEmoji).toBeInTheDocument();
  });
  it('the page contains a specific image', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const img = getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
