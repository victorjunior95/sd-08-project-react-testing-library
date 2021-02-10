import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound.js tests', () => {
  it('Should has a specific text in a tag `h2`', () => {
    render(<NotFound />);

    const h2NotFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(h2NotFound).toBeInTheDocument();
  });

  it('Shoud has a specific img', () => {
    render(<NotFound />);

    const img = screen.getByText((content, element) => {
      const src = element.getAttribute('src');
      return src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    });
    expect(img).toBeInTheDocument();
  });
});
