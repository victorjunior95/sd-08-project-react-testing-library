import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1 - App.test', () => {
  test('Caminho feliz', () => {
    const { history } = renderWithRouter(<App />);

    const headingText = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });
    expect(headingText).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
