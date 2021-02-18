import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Shows the Pokédex when the route is `/`', () => {
  it('renders a heading with the text `Pokédex`', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    expect(pathname).toBe('/');
    const heading = screen.getByRole('heading', { level: 1, name: /pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders Links with the text `Home`, `About` e `Favorite Pokémons`', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('renders a heading with the text `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe('Shows the components,', () => {
  it('When the route is `/about` show <About /> component', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /about/i });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('When the route is `/favorite` show <FavoritePokemons /> component', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('When the route isnt match, show <NotFound /> component', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/no-match/');
    const noMatchHeading = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    const noMatchImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(noMatchHeading).toBeInTheDocument();
    expect(noMatchImg).toBeInTheDocument();
  });
});
