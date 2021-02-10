import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Link `Home`', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const home = screen.getByText(/Home/);
  expect(home).toBeInTheDocument();
});

test('Link `About`', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const about = screen.getByText(/About/);
  expect(about).toBeInTheDocument();
});

test('link `Favorite Pokémons`', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const fav = screen.getByText(/Favorite Pokémons/);
  expect(fav).toBeInTheDocument();
});
