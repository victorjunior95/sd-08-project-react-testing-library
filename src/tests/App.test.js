import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const homeText = 'Encountered pokémons';
const aboutText = 'About Pokédex';
const favoritesText = 'Favorite pokémons';
const notFoundText = /Page requested not found/i;

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(homeText)).toBeInTheDocument();
});

describe('requirement 01', () => {
  test(`Teste se a página principal da Pokédex é renderizada ao carregar
   a aplicação no caminho de URL /.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    expect(getByText(homeText)).toBeInTheDocument();
  });

  test(`Teste se o topo da aplicação contém um conjunto fixo
   de links de navegação.`, () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const links = ['Home', 'About', 'Favorite Pokémons'];
    const checkLinks = () => {
      links.forEach((link) => {
        expect(getByRole('link', { name: link })).toBeInTheDocument();
      });
    };
    expect(history.location.pathname).toBe('/');
    checkLinks();
    history.push('/about');
    checkLinks();
    history.push('/favorites');
    checkLinks();
    history.push('/biancalindona');
    checkLinks();
  });

  test(`Teste se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const homeLink = getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(getByText(homeText)).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página de About,
   na URL /about,
   ao clicar no link About da barra de navegação.`, () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: 'About' }));
    expect(getByText(aboutText)).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: 'Favorite Pokémons' }));
    expect(getByText(favoritesText)).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página Not Found
   ao entrar em uma URL desconhecida.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/biancalindona');
    expect(getByText(notFoundText)).toBeInTheDocument();
  });
});
