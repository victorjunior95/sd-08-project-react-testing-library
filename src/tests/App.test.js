import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Realiza os teste do componente App', () => {
  it('Testa se a página principal é renderizada', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Pokédex/i);
    expect(home).toBeInTheDocument();
  });

  it('Testa se possui os links de navegação (Home, About e Favorite Pokémons)', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Testa o redirecionamento à página Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    expect(history.location.pathname).toBe('/');
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });

  it('Testa o redirecionamento à página About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  it('Testa o redirecionamento à Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
    const favorite = getByText('Favorite pokémons');
    expect(favorite).toBeInTheDocument();
  });

  it('Testa o redirecionamento à Page not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page/page-not-found');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
