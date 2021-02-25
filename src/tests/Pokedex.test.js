import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('teste pokedex requisito 1#', () => {
  it('teste se a pagina renderiza no path /', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('este se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    const linkPokemon = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkPokemon).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('este se a aplicação é redirecionada para a página de About', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkPokemon = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(linkPokemon);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('este se a aplicação é redirecionada para a página Not Found', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/asdasd');

    const getText = screen.getByText(/not found/i);
    expect(getText).toBeInTheDocument();
  });
});
