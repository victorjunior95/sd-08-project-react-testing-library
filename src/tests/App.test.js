import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('if the first link has "home" as text', () => {
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

test('if the second link has "About" as text', () => {
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

test('if the third link has "Favorite Pokémons" as text', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoritePoke = getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(favoritePoke).toBeInTheDocument();
});

test('if the "Home link" redirects to URL "/" ', () => {
  const { getByText, history } = renderWithRouter(
    <App />,
  );
  const homePath = getByText(/Home/i);
  fireEvent.click(homePath);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('if the "About link" redirect to URL "/about"', () => {
  const { getByText, history } = renderWithRouter(
    <App />,
  );
  const homePath = getByText(/about/i);
  fireEvent.click(homePath);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('if the "favorite link" redirect to URL "/favorites"', () => {
  const { getByText, history } = renderWithRouter(
    <App />,
  );
  const homePath = getByText(/Favorite Pokémons/i);
  fireEvent.click(homePath);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('if the application is redirect if the URL is unknown', () => {
  const { getByText, history } = renderWithRouter(
    <App />,
  );
  const route = '/ornitorrinco';
  history.push(route);
  const routeNotFound = getByText(/Page requested not found/i);
  expect(routeNotFound).toBeInTheDocument();
});
