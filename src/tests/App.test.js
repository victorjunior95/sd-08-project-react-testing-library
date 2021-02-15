import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste App', () => {
  test('Renderiza texto `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Verifica o link Home e seu pathname ', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica o link About e seu pathname ', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Verifica o link Farovite e seu pathname ', () => {
    const { history } = renderWithRouter(<App />);

    const linkFarovite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFarovite).toBeInTheDocument();
    fireEvent.click(linkFarovite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Verifica o pagina nao encontrada e seu pathname ', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/rotaerrada');
    const textError = getByText(/Page requested not found/i);
    expect(textError).toBeInTheDocument();
  });
});
