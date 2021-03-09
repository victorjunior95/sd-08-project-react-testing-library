import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import { render, fireEvent } from '@testing-library/react';
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

test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
    );
  const linkHome = getByText('Home');
  const linkAbout = getByText('About');
  const linkFavorite = getByText('Favorite Pokémons');

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});

test('Verifica se a aplicação é redirecionada para a página do link "Home"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText('Home');

  fireEvent.click(linkHome);
  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test('Verifica se a aplicação é redirecionada para a página do link "About"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText('About');

  fireEvent.click(linkAbout);
  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test('Verifica se a aplicação é redirecionada para a página do link "Favorite pokémons"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavorite = getByText('Favorite Pokémons');

  fireEvent.click(linkFavorite);
  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});

test('Verifica se a aplicação é redirecionada para a página do link "NotFound"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/page-not-found');
  const NotFound = getByText('Page requested not found')
  

  expect(NotFound).toBeInTheDocument();
});
