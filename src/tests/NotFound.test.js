import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('title', () => {
  const { history } = renderWithRouter(<App />);

  history.push('xablau');
  const el = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(el).toBeInTheDocument();
});

test('imagem', () => {
  const { history, container } = renderWithRouter(<App />);
  history.push('xablau');
  const el = container.querySelector('.not-found-image');
  expect(el).toBeInTheDocument();

  expect(el).toHaveProperty(
    'src',
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
