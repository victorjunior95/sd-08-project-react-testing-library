import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste a página principal da Pokédex', () => {
  test('se a p.p é renderizada ao carregar a aplicação no caminho de URL `/`.', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const urlCurrent = pathname;
    expect(urlCurrent).toBe('/');
  });
});
describe('Teste se o topo da aplic. contém um conj. fixo de links de navegação.', () => {
  test('O primeiro link deve possuir o texto `Home`.', () => {
    renderWithRouter(<App />);
    const testLink = screen.getByText('Home');
    expect(testLink).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto ´About´', () => {
    renderWithRouter(<App />);
    const testLink = screen.getByText('About');
    expect(testLink).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto `Favorite Pokémons`', () => {
    renderWithRouter(<App />);
    const testLink = screen.getByText('Favorite Pokémons');
    expect(testLink).toBeInTheDocument();
  });
});
describe('Teste redirecionada para a página inicial', () => {
  test('se a aplicação é redirecionada na URL `/` ao clicar no link `Home`.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const { pathname } = history.location;
    const urlCurrent = pathname;
    expect(urlCurrent).toBe('/');
  });
});
describe('Teste se a aplicação redireciona o link ´About', () => {
  test('se clicando em `About`redirecionada a página de `About`, na URL `/about`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const urlCurrent = history.location.pathname;
    expect(urlCurrent).toBe('/about');
  });
});
describe('Teste se a aplicação redireciona o link ´Pokémons Favoritados´', () => {
  test('click em ´Pokémons Favoritado´ leva a pág correta, na URL `/favorites´', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const urlCurrent = history.location.pathname;
    expect(urlCurrent).toBe('/favorites');
  });
});
describe('Redirecionamento para a página `Not Found`', () => {
  test('se a aplicação é redirecionada para a página `Not Found`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/qualquercoisa');
    const urlCurrent = history.location.pathname;
    expect(urlCurrent).toBe('/qualquercoisa');
    const testError = getByText(/Page requested not found/);
    expect(testError).toBeInTheDocument();
  });
});
