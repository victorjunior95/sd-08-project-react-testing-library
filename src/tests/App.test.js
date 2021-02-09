import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

test('se a página principal da Pokédex é renderizada ao carregar a aplicação', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const navLinkHome = screen.getByText('Home');
  const navLinkAbout = screen.getByText('About');
  const navLinkFavorite = screen.getByText('Favorite Pokémons');
  expect(navLinkHome).toBeInTheDocument();
  expect(navLinkAbout).toBeInTheDocument();
  expect(navLinkFavorite).toBeInTheDocument();
});

test('Se a aplicação é redirecionada para a página inicial ao clicar em Home', () => {
  const { history } = renderWithRouter(<App />);
  const navLinkHome = screen.getByText('Home');
  fireEvent.click(navLinkHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Se a aplicação é redirecionada para a página About ao clicar em About', () => {
  const { history } = renderWithRouter(<App />);
  const navLinkAbout = screen.getByText('About');
  fireEvent.click(navLinkAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Se ao clicar em Pokémons Favoritados o Path é "/favorites"', () => {
  const { history } = renderWithRouter(<App />);
  const navLinkFavorite = screen.getByText('Favorite Pokémons');
  fireEvent.click(navLinkFavorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Se a aplicação é redirecionada para a página Not Found', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/outropath');
  const noMatch = screen.getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
