import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Req IV - Testing NotFound.js Component', () => {
  it('4.1 - should test if page contains heading level 2', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(heading).toBeInTheDocument();
  });

  it('4.2 - should test if page contains img', () => {
    const { getByRole } = render(<NotFound />);
    const image = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
