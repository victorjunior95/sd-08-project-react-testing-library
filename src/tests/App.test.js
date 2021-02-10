import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 01', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Teste 01 - Mandar para página principal', () => {
    const { history } = renderWithRouter(<App />);
    const homePage = screen.getByRole('heading', { name: /Encountered pokémons/i });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(homePage).toBeInTheDocument();
  });

  it('Teste 02 - Verificar existência links navegação', () => {
    renderWithRouter(<App />);
    const homeLinkBtn = screen.getByRole('link', { name: /Home/i });
    expect(homeLinkBtn).toBeInTheDocument();

    const aboutLinkBtn = screen.getByRole('link', { name: /About/i });
    expect(aboutLinkBtn).toBeInTheDocument();

    const favoritesLinkBtn = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritesLinkBtn).toBeInTheDocument();
  });

  it('Teste 03 - Redirecionamento para página principal via link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLinkBtn = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLinkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste 04 - Redirecionamento para página about via link', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLinkBtn = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLinkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste 05 - Redirecionamento para página favoritos via link', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLinkBtn = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritesLinkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste 06 - Redirecionamento para página não encontrada', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/notFound');
    const notFoundPage = getByRole('heading', { level: 2 });
    expect(notFoundPage).toBeInTheDocument();
  });
});
