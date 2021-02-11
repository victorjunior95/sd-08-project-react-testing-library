import React from 'react';
import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testing the <App /> component', () => {
  test(`If the Pokédex main page is rendered by
   loading the application in the / URL path`, () => {
    const {
      history: {
        location: { pathname },
      },
    } = renderWithRouter(<App />);
    expect(pathname).toBe('/');
  });

  test(`If 
  the top of the application contains a fixed set of navigation links.`, () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/favorite pokémons/i)).toBeInTheDocument();
  });

  test(`If the application is redirected to the home page,
   at the URL / by clicking on the Home link in the navigation bar.
  `, () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/home/i));
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/');
  });

  test(`If the application is redirected to the About page,
   in the URL / about, by clicking on the About link in the navigation bar.`, () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/about/i));
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/about');
  });

  test(`If the application is redirected to the Favorite Pokémon page,
   in the URL / favorites, by clicking on the
    Favorite Pokémons link in the navigation bar.`, () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/favorite pokémons/i));
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/favorites');
  });

  test(`If the application is redirected to
   the Not Found page when entering an unknown URL.
  `, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page/page-not-found');
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
