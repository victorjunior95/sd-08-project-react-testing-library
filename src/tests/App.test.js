import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1- A página principal deve ser renderizada no caminho "/".', () => {
  it('Deve ser renderizado um texto `Pokédex`', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(pathname).toBe('/');
  });
});

describe('2- Deve aparecer um conjunto de links fixos.', () => {
  it('O primeiro link deve ter o texto "Home"', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(homeLink).toBeInTheDocument();
  });
  it('O segundo link deve ter o texto "About"', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    expect(aboutLink).toBeInTheDocument();
  });
  it('O terceiro link deve ter o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
  });
});
