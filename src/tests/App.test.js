import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App.js tests', () => {
  it('Should be on pathname=`/` and have a h2 with the text `Encountered pokémons`',
    () => {
      const { history } = renderWithRouter(<App />);

      const { pathname } = history.location;
      expect(pathname).toBe('/');

      const heading = screen.getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      });
      expect(heading).toBeInTheDocument();
    });

  it('Should have 3 specific links in order', () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link');
    const NUMBER_OF_LINKS = 3;
    expect(links.length).toBeGreaterThanOrEqual(NUMBER_OF_LINKS);

    const linksText = ['Home', 'About', 'Favorite Pokémons'];
    links.forEach((link, index) => {
      if (index < NUMBER_OF_LINKS) expect(link.textContent).toBe(linksText[index]);
    });
  });

  it('Should flow correctly by link clicks: About and Favorites', () => {
    const { history } = renderWithRouter(<App />);

    const links = screen.getAllByRole('link');

    userEvent.click(links[1]);
    let { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutHeading).toBeInTheDocument();

    userEvent.click(links[2]);
    pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const favoriteHeading = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(favoriteHeading).toBeInTheDocument();
  });

  it('Should render pageNotFound and go back to Home on link click', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/random');
    const notFoundHeading = screen.getByRole('heading', {
      level: 2,
      name: /not found/i,
    });
    expect(notFoundHeading).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
