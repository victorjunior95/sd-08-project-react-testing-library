import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Render <NotFound/> component,`', () => {
  it('show heading element with text `Page requested not found`', () => {
    render(<NotFound />);
    const noMatchHeading = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(noMatchHeading).toBeInTheDocument();
  });

  it('show image element with source `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    render(<NotFound />);
    const noMatchImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(noMatchImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
