import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App.js', () => {
  test('renders a heading with the text `Pokédex`', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    const heading = screen.getByRole('heading', { level: 1, name: /Pokédex/i });
    expect(heading).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  test('renders all the links of navigation', () => {
    renderWithRouter(<App />);

    const Home = screen.getByRole('link', { name: /Home/i });
    expect(Home).toBeInTheDocument();

    const About = screen.getByRole('link', { name: /About/i });
    expect(About).toBeInTheDocument();

    const FavoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(FavoritePokémons).toBeInTheDocument();
  });

  test('the URL of the link Home', () => {
    const { history } = renderWithRouter(<App />);

    const Home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(Home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('the URL of the link About', () => {
    const { history } = renderWithRouter(<App />);

    const About = screen.getByRole('link', { name: /About/i });
    userEvent.click(About);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('the URL of the link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const FavoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(FavoritePokémons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('an invalid URL', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(noMatch).toBeInTheDocument();
  });
});
