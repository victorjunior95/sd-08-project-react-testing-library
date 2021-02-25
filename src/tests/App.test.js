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

test('O primeiro link deve possuir o texto `Home`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const home = getByRole('link', {
    name: /home/i,
  });
  expect(home).toBeInTheDocument();
});

test('O segundo link deve possuir o texto `About`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const about = getByRole('link', {
    name: /about/i,
  });
  expect(about).toBeInTheDocument();
});

test('O terceiro link deve possuir o texto `Favorite Pokémons`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favorite = getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(favorite).toBeInTheDocument();
});
