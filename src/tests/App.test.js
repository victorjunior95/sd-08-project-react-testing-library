import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Render main page', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Pokédex/i);
  expect(home).toBeInTheDocument();
});

test('Navegation links', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  const favorite = getByText('Favorite Pokémons');
  const about = getByText('About');
  expect(home).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
  expect(about).toBeInTheDocument();
});

test('Redirect to home page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  userEvent.click(getByText(/Home/i));
  expect(history.location.pathname).toBe('/');
  const home = getByText('Encountered pokémons');
  expect(home).toBeInTheDocument();
});

test('Redirect about page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  userEvent.click(getByText(/About/i));
  expect(history.location.pathname).toBe('/about');
  const about = getByText('About Pokédex');
  expect(about).toBeInTheDocument();
});

test('Redirect to favorite pokemons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  userEvent.click(getByText(/Favorite Pokémons/i));
  expect(history.location.pathname).toBe('/favorites');
  const favorite = getByText('Favorite pokémons');
  expect(favorite).toBeInTheDocument();
});

test('Redirect to page not found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/page/page-not-found');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});