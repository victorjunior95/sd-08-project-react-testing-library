import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1 - App.test', () => {
  test('Teste feliz', () => {
    const { history } = renderWithRouter(<App />);

    const headingTextLvlOne = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });
    expect(headingTextLvlOne).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const headingTextLvlTwoHome = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(headingTextLvlTwoHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const headingTextLvlTwoAbout = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(headingTextLvlTwoAbout).toBeInTheDocument();

    const linkFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavoritePokemons).toBeInTheDocument();

    userEvent.click(linkFavoritePokemons);

    const headingTextLvlTwoFavorite = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(headingTextLvlTwoFavorite).toBeInTheDocument();

    history.push('/some-route');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
