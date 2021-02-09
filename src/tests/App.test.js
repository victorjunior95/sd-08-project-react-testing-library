import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('O componente é renderizado corretamente e no caminho certo.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Existência de 3 links de navegação', () => {
    const links = ['Home', 'About', 'Favorite Pokémons'];
    const { getByRole } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    expect(nav.children).toHaveLength(links.length);
    links.forEach((link) => {
      expect(getByRole('link', { name: link })).toBeInTheDocument();
    });
  });

  it('Funcionalidade dos links da aplicação', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const links = { Home: '/', About: '/about', 'Favorite Pokémons': '/favorites' };
    Object.keys(links).forEach((link) => {
      userEvent.click(getByRole('link', { name: link }));
      const { pathname } = history.location;
      expect(pathname).toBe(links[link]);
    });
  });

  it('Verifica página not found ao entrar em uma URL desconhecida', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const path = '/not-a-pathname';
    history.push(path);
    const title = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(title).toBeInTheDocument();
  });
});
