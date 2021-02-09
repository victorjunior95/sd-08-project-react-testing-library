import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('App.js', () => {
  test('Teste se página principal da Pokédex é renderizada no caminho de URL /.', () => {
    const { history } = renderWithRouter(<App />);
    const InitialPage = screen.getByRole('heading', { name: /Encountered pokémons/i });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(InitialPage).toBeInTheDocument();
  });

  test('Teste topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Teste se é a página inicial, na URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste a página de About, na URL /about, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste de renderização do link de navegação favorites pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste: é redirecionada para a página Not Found com uma URL desconhecida', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const noMatch = getByRole('heading', { level: 2 });
    expect(noMatch).toBeInTheDocument();
  });
});
