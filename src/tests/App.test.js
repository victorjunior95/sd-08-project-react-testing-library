import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const routes = {
  FAVORITES: '/favorites',
  ABOUT: '/about',
  HOME: '/',
};

describe('Teste o componente <App.js />', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test(`A página principal da Pokédex é renderizada ao carregar a 
aplicação no caminho de URL /.`, () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe(routes.HOME);
    expect(getByText(/Encountered pokémons/)).toBeInTheDocument();
  });

  test(`Teste se o topo da aplicação contém um conjunto fixo 
de links de navegação.`, () => {
    const { history, getByRole } = renderWithRouter(<App />);

    const linkNames = ['Home', 'About', 'Favorite Pokémons'];
    const checkLinks = (callback, names) => {
      names.forEach((name) => {
        const link = callback('link', { name: new RegExp(name, 'i') });
        expect(link).toBeInTheDocument();
      });
    };

    expect(history.location.pathname).toBe(routes.HOME);
    checkLinks(getByRole, linkNames);

    history.push(routes.ABOUT);
    expect(history.location.pathname).toBe(routes.ABOUT);
    checkLinks(getByRole, linkNames);

    history.push(routes.FAVORITES);
    expect(history.location.pathname).toBe(routes.FAVORITES);
    checkLinks(getByRole, linkNames);
  });

  test(`O primeiro link deve possuir o texto Home, o segundo link deve possuir 
o texto About e o terceiro link deve possuir o texto Favorite Pokémons.`, () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  test(`Teste se a aplicação é redirecionada para a página inicial, 
na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { getByRole, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe(routes.HOME);
    history.push(routes.ABOUT);
    expect(history.location.pathname).toBe(routes.ABOUT);
    const home = getByRole('link', { name: /home/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe(routes.HOME);
  });

  test(`Teste se a aplicação é redirecionada para a página de About, na URL 
/about, ao clicar no link About da barra de navegação.`, () => {
    const { getByRole, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe(routes.HOME);
    const about = getByRole('link', { name: /about/i });
    userEvent.click(about);
    expect(history.location.pathname).toBe(routes.ABOUT);
  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, 
na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { getByRole, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe(routes.HOME);
    const about = getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(about);
    expect(history.location.pathname).toBe(routes.FAVORITES);
  });

  test(`Teste se a aplicação é redirecionada para a página Not Found ao entrar 
em uma URL desconhecida.`, () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe(routes.HOME);
    history.push(`/${Math.random()}`);
    const text = 'Pikachu crying because the page requested was not found';
    expect(getByAltText(new RegExp(text, 'i'))).toBeInTheDocument();
  });
});
