import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    // O primeiro link deve possuir o texto Home.

    const linkHome = getByText('Home');

    // O segundo link deve possuir o texto About.

    const linkAbout = getByText('About');

    // O terceiro link deve possuir o texto Favorite Pokémons. */

    const linkFavorite = getByText('Favorite Pokémons');

    expect(linkHome).toBeInTheDocument();

    expect(linkAbout).toBeInTheDocument();

    // Teste  da barra de navegação.

    expect(linkFavorite).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página do link Home.', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText('Home');
    // Interagir com eles
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    // Fazer o teste
    expect(pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a página do link About', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    // Interagir com eles
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    // Fazer o teste
    expect(pathname).toBe('/about');
  });

  it('A aplicação é redirecionada para a página do link Favorite Pokémons', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorite = getByText('Favorite Pokémons');
    // Interagir com eles
    fireEvent.click(linkFavorite);
    const { pathname } = history.location;
    // Fazer o teste
    expect(pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página do link "NotFound"', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const NotFound = getByText('Page requested not found');
    expect(NotFound).toBeInTheDocument();
  });
});
