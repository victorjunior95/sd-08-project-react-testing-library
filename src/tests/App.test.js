import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
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

test('heading contains a fixed nav links group: Home, About, Favorite Pokémons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  const favPokemons = getByText(/Favorite Pokémons/i);

  expect(screen.getByRole('navigation')).toContainElement(home);
  expect(screen.getByRole('navigation')).toContainElement(about);
  expect(screen.getByRole('navigation')).toContainElement(favPokemons);
});

test('click Home link in the navbar, redirect the application to Home, in URL /', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/home/i), leftClick);

  expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('click About link in the navbar, redirect the app to About, in URL /about', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/about/i), leftClick);

  expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
});

// TODO: this test will break when the user favorite a Poké
test('click Favorite Pokémons link, redirect the app to URL /favorites', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/favorite pokémons/i), leftClick);

  expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});

test('insert unknown URL, redirect the application to Not Found page', () => {
  const history = createMemoryHistory();
  history.push('/something-that-does-not-match');
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
});
