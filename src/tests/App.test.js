import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('A página principal da Pokédex é renderizada ao carregar a aplicação?', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto Home, About, e Favorite Pokémons', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFP = getByRole('link', { name: /favorite pokémons/i });
    expect(linkFP).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página inicial, ao clicar no link Home', () => {
    const { getByRole, history: { location: { pathname } } } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /home/i }));
    const pathnameL = pathname;
    expect(pathnameL).toBe('/');
  });

  it('Aplicação é redirecionada para a página de About, ao clicar no link About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /about/i }));
    const pathnameL = history.location.pathname;
    expect(pathnameL).toBe('/about');
  });

  it('Aplicação é redirecionada para a página Pokémons Favoritados', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /favorite pokémons/i }));
    const pathnameL = history.location.pathname;
    expect(pathnameL).toBe('/favorites');
  });

  it('Aplicação é redirecionada para a página Not Found?', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/algumacoisa');
    const pathnameL = history.location.pathname;
    expect(pathnameL).toBe('/algumacoisa');
    const msg = getByRole(
      'heading',
      { level: 2 },
      { name: /page requested not foundcrying/i },
    );
    expect(msg).toBeInTheDocument();
  });
});
