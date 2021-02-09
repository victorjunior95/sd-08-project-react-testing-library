import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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

test('renders a link with the text `Home`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByRole('link', { name: /home/i });
  expect(homeLink).toBeInTheDocument();
});

test('renders a link with the text `About`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = getByRole('link', { name: /about/i });
  expect(aboutLink).toBeInTheDocument();
});

test('renders a link with the text `Favorite Pokémons`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = getByRole('link', { name: /favorite pokémons/i });
  expect(aboutLink).toBeInTheDocument();
});
