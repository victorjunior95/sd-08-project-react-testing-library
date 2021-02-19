import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se a página é renderizada com "/"', () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Test de links se há links na página', () => {
  const { getByRole } = renderWithRouter(<App />);
  const linkHome = getByRole('link', { name: /home/i });
  expect(linkHome).toBeInTheDocument();

  const linkAbout = getByRole('link', { name: /about/i });
  expect(linkAbout).toBeInTheDocument();

  const linkFavorite = getByRole('link', { name: /favorite pokémons/i });
  expect(linkFavorite).toBeInTheDocument();
});

test('Renderizando home ao clicar no link', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  const linkHome = getByRole('link', { name: /home/i });
  userEvent.click(linkHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Renderizando About ao clicar no link', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  const linkAbout = getByRole('link', { name: /about/i });
  userEvent.click(linkAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Renderizando Favorite Pokemons ao clicar no link', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  const linkFavorite = getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(linkFavorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Testando o redirecionamento paga página não encontrada', () => {
  const { history, getByText } = renderWithRouter(<App />);
  history.push('/pokemon-inexistente');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
