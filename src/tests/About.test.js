import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Primeiro teste', () => {
  renderWithRouter(<App />);
  const textProjects = screen.getByRole('heading', {
    level: 1,
    name: /Pokédex/i,
  });
  expect(textProjects).toBeInTheDocument();
});
