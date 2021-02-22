import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('show links in nav bar', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(getByRole('link', { name: /about/i })).toBeInTheDocument();
  expect(getByRole('link', { name: /favorite pokémons/i })).toBeInTheDocument();
});
