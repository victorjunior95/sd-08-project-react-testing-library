import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testa App.js', () => {
  it(`Teste se a página principal da Pokédex é renderizada
    ao carregar a aplicação no caminho de URL /`, () => {
    const { history } = renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });
    const { pathname } = history.location;
    expect(heading).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it(`Teste se o topo da aplicação contém um conjunto
    fixo de links de navegação.`, () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    const favPokemon = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemon).toBeInTheDocument();
  });

  it('Testa se os link redireciona para as devidas páginas', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    const favPokemon = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favPokemon);
    expect(history.location.pathname).toBe('/favorites');

    const noMatch = '/url-que-nao/existe';
    history.push(noMatch);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
