import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('searches for a Home link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const homeText = getByText(/Pokédex/i);
  expect(homeText).toBeInTheDocument();
});

test('searches for an About link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const aboutText = getByText(/About Pokédex/i);
  expect(aboutText).toBeInTheDocument();
});

test('searches for a Favorite Pokemon link', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const faveText = getByRole('heading', {
    level: 2,
    name: /Favorite Pokémons/i,
  });
  expect(faveText).toBeInTheDocument();
});

test('testing Not Found Page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/page/not-found');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
