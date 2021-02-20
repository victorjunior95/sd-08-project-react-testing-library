import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
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

describe('contains a fixed set of navigation links', () => {
  it('contains home link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const homeLink = getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });
  it('contains about link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });
  it('contains favorite pokémons link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favoritePokemonsLink = getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });
});
