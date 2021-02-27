import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('teste da pagina /notfound', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found',
    () => {
      const { container } = renderWithRouter(<NotFound />);
      const title = screen.getByRole('heading', { name: /Page requested not found/i,
        level: 2 });
      const img = container.querySelector('img');
      const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

      expect(title).toBeInTheDocument();
      expect(img.src).toBe(imgUrl);
    });
});

// reference: https://testing-library.com/docs/react-testing-library/api/#container;
