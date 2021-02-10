import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './renderWithRouter';

describe('Testando o componente <App.js />', () => {
  const it1 = 'Pág principal é renderizada ao carregar a aplicação no caminho de URL /';
  it(it1, () => {
    const { getByText, history } = RenderWithRouter(<App />);

    const home = getByText('Encountered pokémons');
    const homeButton = getByText('Próximo pokémon');

    expect(home).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = RenderWithRouter(<App />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Se é redirecionada para a página inicial ao clicar no link Home', () => {
    const { history } = RenderWithRouter(<App />);
    const buttonLink = screen.getByText(/home/i);

    fireEvent.click(buttonLink);

    const pokeTitle = screen.getByText(/pokédex/i);
    const pokeButton = screen.getByText(/próximo pokémon/i);

    expect(pokeTitle).toBeInTheDocument();
    expect(pokeButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('Se é redirecionada para a página /about ao clicar no link About', () => {
    const { history } = RenderWithRouter(<App />);
    const buttonLink = screen.getByText(/about/i);

    fireEvent.click(buttonLink);

    const pokeTitle = screen.getByText(/about pokédex/i);

    expect(pokeTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  it('Se é redirecionada para /favorites ao clicar no link Favorite Pokémons', () => {
    const { history } = RenderWithRouter(<App />);
    const buttonLink = screen.getByText(/favorite pokémons/i);

    fireEvent.click(buttonLink);

    const pokeTitle = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });

    expect(pokeTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Se é redirecionada para Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/notfound');

    const pokeTitle = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(pokeTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/notfound');
  });
});
