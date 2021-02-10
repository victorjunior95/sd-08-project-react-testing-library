import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('<App /> test', () => {
  it('The links must be on the page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: 'Home',
    });

    const linkAbout = getByRole('link', {
      name: 'About',
    });

    const linkFavoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Must be redirected to the home page by clicking the Home.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: 'Home',
    });

    userEvent.click(linkHome);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Must be redirected to the about page by clicking the About.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkAbout = getByRole('link', {
      name: 'About',
    });

    userEvent.click(linkAbout);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Must be redirected to the favorites page by clicking the Favorite Pokémon.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkFavoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Should be redirected to the page not found when inserting an unknown url.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/qualquer-coisa');
    const noMatch = getByText('Page requested not found');

    expect(noMatch).toBeInTheDocument();
  });
});
