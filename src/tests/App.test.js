import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/route/renderWithRouter';

const textPokemons = 'Encountered pokémons';
const pokedexText = 'About Pokédex';
const favoritePokemon = 'Favorite pokémons';
const notFound = /Page requested not found/i;

test('renders a pokedex', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(textPokemons)).toBeInTheDocument();
});

describe('01', () => {
  test(`Teste se a página principal da Pokédex é renderizada ao carregar
   a aplicação no caminho de URL /.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    expect(getByText(textPokemons)).toBeInTheDocument();
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
    history.push('/xablau');
    checkLinks();
  });

  test(`Teste se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const home = getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    expect(getByText(textPokemons)).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página de About,
   na URL /about,
   ao clicar no link About da barra de navegação.`, () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: 'About' }));
    expect(getByText(pokedexText)).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: 'Favorite Pokémons' }));
    expect(getByText(favoritePokemon)).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página Not Found
   ao entrar em uma URL desconhecida.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    expect(getByText(notFound)).toBeInTheDocument();
  });
});