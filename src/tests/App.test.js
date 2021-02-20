import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App.js', () => {
  test('se a página principal da Pokédex é renderizada no caminho de URL /', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('se contém um conjunto fixo de links de navegação', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: 'Home',
    });
    const linkAbout = getByRole('link', {
      name: 'About',
    });
    const linkFavoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
  test('se é redirecionado ao link Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkHome = getByRole('link', {
      name: 'Home',
    });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('se é redirecionado ao link About', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkAbout = getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('se é redirecionado ao link Favorite Pokémons', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkFavoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  test('se é redirecionada para a página Not Found ao entrar em uma URL desconhecida',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/trybe');
      const noMatch = getByText('Page requested not found');
      expect(noMatch).toBeInTheDocument();
    });
});
