import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Tests <App.js /> component', () => {
  it('Renderizar texto da Pokedex', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it('Redenrizar a homepage no path root', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it('Navegação fixa', () => {
    const { getByText } = renderWithRouter(<App />);

    const links = ['Home', 'About', 'Favorite Pokémons'];

    const handleCheckLinkNames = (array) => {
      array.map((index) => expect(getByText(index)).toBeInTheDocument());
    };

    handleCheckLinkNames(links);
  });

  it('Ir para home quando clicar no link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;

    userEvent.click(getByText('Home'));
    expect(pathname).toBe('/');
  });

  it('Ir para about quando clicar no link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('About'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('Ir para Favorite quando clicar no link',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      userEvent.click(getByText('Favorite Pokémons'));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

  it('Path de erro', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/not-found');
    const notFoundText = getByText(/not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});