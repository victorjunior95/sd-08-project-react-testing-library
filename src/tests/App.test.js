import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('check for links', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);

  const pokedexText = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokedexText).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const aboutText = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(aboutText).toBeInTheDocument();

  const favoriteLink = screen.getByRole('link', {
    name: /favorite/i,
  });
  expect(favoriteLink).toBeInTheDocument();
  userEvent.click(favoriteLink);

  const favoriteText = screen.getByRole('heading', {
    level: 2,
    name: /Favorite pokémons/i,
  });
  expect(favoriteText).toBeInTheDocument();

  history.push('/algumacoisa/');
  const notfound = screen.getByText(/Page requested not found/i);
  expect(notfound).toBeInTheDocument();
});
