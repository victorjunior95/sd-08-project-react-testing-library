import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Será avaliado se o arquivo teste App.test.js contemplam 100% dos casos de uso criados pelo Stryker.
describe('App.js:', () => {
  //  'renderiza uma leitura com o texto `Pokédex`'
  test('Renders a reading with the text `Pokédex`', () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
    // O primeiro link deve possuir o texto Home.
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
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
  test(`The main page of Pokédex is rendered
  when loading the application in the URL path /`, () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  // Teste se o topo da aplicação contém um conjunto fixo de links de navegação.
  test('The header application contains a fixed set of navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // O segundo link deve possuir o texto About.
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(aboutLink);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });

  test('The header application contains a fixed set of navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // O terceiro link deve possuir o texto Favorite Pokémons.
    const favoritesLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoritesLink);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(heading).toBeInTheDocument();
  });
});
