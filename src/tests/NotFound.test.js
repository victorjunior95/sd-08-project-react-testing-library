import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Notfound from '../components/NotFound';

test('teste de notfound', () => {
  render(
    <Router history={ createMemoryHistory() }>
      <Notfound />
    </Router>,
  );
  const notfoundtest = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not/i,
  });
  expect(notfoundtest).toBeInTheDocument();
  const imagenotFound = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(imagenotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
