import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes no App.js', () => {
  test('Existe o h1 `Pokédex` ?', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Existe o texto `Home` ?', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });

  test('Existe o texto `About` ?', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
  });

  test('Existe o texto `Favorite Pokémons` ?', () => {
    const { getByText } = renderWithRouter(<App />);
    const favouritePokemons = getByText(/Favorite Pokémons/i);
    expect(favouritePokemons).toBeInTheDocument();
  });

  test('Deve renderizar o componente Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homePage = getByText(/Pokédex/i);
    expect(homePage).toBeInTheDocument();
  });

  test('Deve renderizar o componente About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutPage = getByText(/About Pokédex/i);
    expect(aboutPage).toBeInTheDocument();
  });

  test('Deve renderizar o componente Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoritePage = getByText(/No favorite pokemon found/i);
    expect(favoritePage).toBeInTheDocument();
  });

  test('Deve testar página inexistente `Not found`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
