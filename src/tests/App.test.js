import React from 'react';
import { within, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testando se a aplicação renderiza o App.js na rota \'/\'', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const { pathname } = history.location;

  expect(pathname).toBe('/');
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testando os links do navegador', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});

test('Testando o link Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText('Home');

  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testando o link About', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('Testando o link Favorite Pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText('Favorite Pokémons');

  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Testando o redirecionamento de paginas desconhecidas', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/xablau');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
