import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  renderWithRouter(<App />);
  const heading = screen.getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
