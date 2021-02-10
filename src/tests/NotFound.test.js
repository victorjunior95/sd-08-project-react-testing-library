import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound', () => {
  test('title', () => {
    render(<NotFound />);
    const el = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(el).toBeInTheDocument();
  });

  test('imagem', () => {
    const notfound = render(<NotFound />);
    const el = notfound.container.querySelector('.not-found-image');
    expect(el).toBeInTheDocument();

    expect(el).toHaveProperty(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
