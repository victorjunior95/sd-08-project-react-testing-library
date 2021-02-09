import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('req 4', () => {
  it('not found', () => {
    const { getByRole, getByAltText } = render(<NotFound />);
    const title = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(title).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
