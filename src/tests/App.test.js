import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
// import { RuleTester } from 'eslint';
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

test('Os links home - About - Favorit... existem? ', () => {
  const { rend } = renderWithRouter(<App />);
  // console.log(rend);
  const linkhome = screen.getByRole(
    'link', {
      name: /Home/i,
    },
  );
  const linkAbout = screen.getByRole(
    'link', {
      name: /About/i,
    },
  );
  const linkFavorite = screen.getByRole(
    'link', {
      name: /Favorite Pokémons/i,
    },
  );
  expect(linkhome && linkAbout && linkFavorite).toBeInTheDocument();
});

test('Testa se o link leva a Home', () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  const linkhome = screen.getByRole(
    'link', {
      name: /Home/i,
    },
  );
  userEvent.click(linkhome);
  expect(pathname).toBe('/');
});
