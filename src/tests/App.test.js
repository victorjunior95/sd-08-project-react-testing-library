import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('App', () => {
  test('Requisito 1', () => {
    const { history } = renderWithRouter(<App />);

    const headingText = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });
    expect(headingText).toBeInTheDocument();
  });
});
