import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWhitRouter from './renderWithRouter';

describe('App.js ', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWhitRouter(<App />);
    const HomeLink = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(HomeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
