import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes Componente APP.js', () => {
  it('Teste se a pagina principal e renderizada.', () => {
    const { history } = renderWithRouter(<App />);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Pokédex' });
    const { pathname } = history.location;

    expect(h1).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('Teste Link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toHaveTextContent('Home');

    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toHaveTextContent('About');

    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste Link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorite).toHaveTextContent('Favorite Pokémons');

    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste pagina NOT FOUND', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urlqualquer');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toHaveTextContent('Page requested not found');
  });
});
