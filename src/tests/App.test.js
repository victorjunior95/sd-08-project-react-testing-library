import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
  });

  test('Link `Home`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });

  test('Link `About`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/About/)).toBeInTheDocument();
  });

  test('link `Favorite Pokémons`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Favorite Pokémons/)).toBeInTheDocument();
  });
});
