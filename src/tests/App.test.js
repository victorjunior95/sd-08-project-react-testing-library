import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

test('the main page is rendered at the path '/'', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('the navigation links are available', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  const favoritePokemonsLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoritePokemonsLink).toBeInTheDocument();
});

test('the home link redirects to the right path', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });

  userEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('the About link redirects to the right path', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });

  userEvent.click(aboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('the Favorite Pokémons link redirects to the right path', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>
  );

  const favoritePokemonsLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });

  userEvent.click(favoritePokemonsLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('when a unknow URL is accessed it leads to the Not Found page', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  history.push('/paginainexistente');
  const notFoundContent = screen.getByText(/page requested not found/i);
  expect(notFoundContent).toBeInTheDocument();
});
