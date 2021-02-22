import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import { NotFound } from '../components';

describe('Teste App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it('testa se a página principal renderiza no caminho "/"', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.entries[0].pathname).toBe('/');
  });

  it('testa se a aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('testa se o link "Home" redireciona para "/"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    expect(history.entries[0].pathname).toBe('/');
  });

  it('testa se o link "About" redireciona para "/about"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
  });

  it('testa se o link "Favorite Pokémons" redireciona para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('testa se uma URL desconhecida redireciona para "/notfound"', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.location.pathname = '/pikachu';
    expect(screen.getByText('not found', { exact: false })).toBeInTheDocument();
  });
});
