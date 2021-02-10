import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1 - Teste o componente \\"App.js"\\', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it(`Teste se o topo da aplicação contém um conjunto fixo de links de navegação
    Home, About, Favorite Pokémon`, () => {
    const nav = ['Home', 'About', 'Favorite Pokémons'];
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const navMenu = getByRole('navigation');
    nav.forEach((el, index) => {
      expect(navMenu.children[index].textContent).toBe(el);
      expect(getByRole('link', { name: el })).toBeInTheDocument();
    });
  });

  it(`Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const btnHHome = getByRole('link', { name: /home/i });
    expect(btnHHome).toBeInTheDocument();
    userEvent.click(btnHHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de
    About, na URL /about, ao clicar no link About da barra de navegação`,
  () => {
    const { history, getByRole } = renderWithRouter(
      <App />,
    );
    const linkAbout = getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`,
  () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const linkFavorites = getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorites).toBeInTheDocument();
    userEvent.click(linkFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página
    Not Found ao entrar em uma URL desconhecida.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
