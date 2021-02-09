import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App.js ', () => {
  //  'renderiza uma leitura com o texto `Pokédex`'
  test('renders a reading with the text `Pokédex`', () => {
    const { history } =  renderWithRouter(<App />);
    // const { getByText } = render(
    //   <MemoryRouter>
    //     <App />
    //   </MemoryRouter>,
    // );

    // Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    })
    userEvent.click(homeLink);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });
    expect(heading).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  // Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /.
  //     'mostra a Pokédex quando a rota é `/`'
  test('shows the Pokédex when the route is `/`', () => {
    const { history } =  renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  // Teste se o topo da aplicação contém um conjunto fixo de links de navegação.
    // O primeiro link deve possuir o texto Home.
    // O segundo link deve possuir o texto About.
    // O terceiro link deve possuir o texto Favorite Pokémons.
  test('the header application contains a fixed set of navigation links', () => {
    const { history } =  renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    })
    userEvent.click(aboutLink);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('the header application contains a fixed set of navigation links', () => {
    const { history } =  renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    })
    userEvent.click(favoritesLink);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(heading).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});









// Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.

// Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.

// Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
