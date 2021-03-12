
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App.js', () => {
  it(`Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no 
  caminho de URL /`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i,
      level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/about/i);
    expect(links[2]).toHaveTextContent(/Favorite Pokémons/i);
  });

  it(`Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no 
  link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About, na URL /about, 
  ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na 
  URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL 
  desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/wrongpage');
    const notFound = screen.getByRole('heading', { name: /Page requested not found/i,
      level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});