import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('req01 conjunto fixo de links de navegação.', () => {
  test('link "Home" da barra de navegação.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();
  });
});
