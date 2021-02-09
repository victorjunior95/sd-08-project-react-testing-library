/* eslint-disable max-len */
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    expect(getByText(/Encountered pokémons/)).toBeInTheDocument();
  });

  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    const linkNames = ['Home', 'About', 'Favorite Pokémons'];
    const checkLinks = (callback, names) => {
      names.forEach((name) => {
        const link = callback('link', { name: new RegExp(name, 'i') });
        expect(link).toBeInTheDocument();
      });
    };

    expect(history.location.pathname).toBe('/');
    checkLinks(getByRole, linkNames);

    history.push('/about');
    expect(history.location.pathname).toBe('/about');
    checkLinks(getByRole, linkNames);

    history.push('/favorites');
    expect(history.location.pathname).toBe('/favorites');
    checkLinks(getByRole, linkNames);
  });

  test('O primeiro link deve possuir o texto Home, o segundo link deve possuir o texto About e o terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/about');
    expect(history.location.pathname).toBe('/about');
    const home = getByRole('link', { name: /home/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const about = getByRole('link', { name: /about/i });
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const about = getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(about);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    history.push(`/${Math.random()}`);
    expect(getByAltText('Pikachu crying because the page requested was not found')).toBeInTheDocument();
  });
});
