import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('', () => {
  test('Testa se a página é renderizada com o texto `pokedex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Mostrando se a pokedex possui a rota `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  test('O primeiro link deve possuir o texto Home', () => {
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
  test('O segundo link deve possuir o texto About', () => {
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
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favorite = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favorite).toBeInTheDocument();
  });
});
test('Teste se ao clicar no link Home a página inicial é redirecionada na URL /', () => {
  const { getByText, history } = renderWithRouter(
    <App />,
  );
  const pathHome = getByText(/Home/i);
  fireEvent.click(pathHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});
test('Teste se ao clicar no link About a página é redirecionada na URL /about', () => {
  const { getByText, history } = renderWithRouter(
    <App />,
  );
  const pathAbout = getByText(/About/i);
  fireEvent.click(pathAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});
test('Ao clicar no link Favorite Pokémons ela é redirecionada pra URL /favorites', () => {
  const { getByText, history } = renderWithRouter(
    <App />,
  );
  const pathFavorite = getByText(/Favorite Pokémons/i);
  fireEvent.click(pathFavorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
test('A aplicação é redirecionada ao entrar em uma URL desconhecida.', () => {
  const { getByText, history } = renderWithRouter(
    <App />,
  );
  const route = '/notfound';
  history.push(route);
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
