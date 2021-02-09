import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Página principal da Pokédex é renderizada ao carregar a aplicação na URL /', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const { pathname } = history.location;
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
  });
});

describe('Topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const home = screen.getByRole('link', {
      name: 'Home',
    });
    expect(home).toBeInTheDocument();
    expect(home).toBe(nav.children[0]);
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const about = screen.getByRole('link', {
      name: 'About',
    });
    expect(about).toBeInTheDocument();
    expect(about).toBe(nav.children[1]);
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const favorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favorite).toBeInTheDocument();
    expect(favorite).toBe(nav.children[2]);
  });
});

describe('Teste se a aplicação é redirecionada para a página...', () => {
  it('inicial na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    const home = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(home);
    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
  });

  it('About, na URL /about, ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(about);
    const { pathname } = history.location;
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(pathname).toBe('/about');
    expect(heading).toBeInTheDocument();
  });

  it('Pokémons Favoritados na URL /favorites ao clik no link Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favorite);
    const { pathname } = history.location;
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(pathname).toBe('/favorites');
    expect(heading).toBeInTheDocument();
  });

  it('Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/palavra-qualquer');
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(heading).toBeInTheDocument();
  });
});
