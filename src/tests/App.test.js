import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('App.js test', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('shows the Pokédex when the route is "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('Teste se a aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const home = getByRole('link', { name: /home/i });
    const about = getByRole('link', { name: /About/i });
    const favorite = getByRole('link', { name: /Favorite Pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
  it('Teste o redirecionamento para /about ao clicar no link About', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const about = getByRole('link', { name: /About/i });
    fireEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste o redirecionamento para /home ao clicar no link home', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /Home/i });
    fireEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Teste o redirecionamento para /favorites ao clicar no link favorites', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const favorite = getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(favorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('renderiza Not Found ao entrar em uma URL desconhecida.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/pagina/inexistente');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
