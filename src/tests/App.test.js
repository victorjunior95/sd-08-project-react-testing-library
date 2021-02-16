import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste componente <App.js />', () => {
  it('Página principal é renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Topo da aplicação contém um conjunto fixo de links de navegação`', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    const favoritePokémonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokémonsLink).toBeInTheDocument();
  });
});

describe('Testes de redirecionamento da página após click', () => {
  it('Redirecionada para página inicial, na URL / ao clicar no link Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    const linkHome = getByRole('link', { name: /home/i });
    userEvent.click(linkHome);

    expect(pathname).toBe('/');
  });

  it('Redirecionada para página About, na URL /about ao clicar no link About', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkAbout = getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Redirecionada para página Pokémons Favoritados, na URL /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkFavoritePokemons = getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    history.push('/notfound');
    const urlNotFound = queryByText(/Page requested not found/i);

    expect(urlNotFound).toBeInTheDocument();
  });
});
