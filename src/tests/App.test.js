import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing App.js component', () => {
  it(`whether the main page of Pokédex is rendered when loading 
  the application in the URL path "/".`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    const heading = getByText(/Pokédex/i);

    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
  });

  it('if the top of the application contains a fixed set of navigation links', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it(`the application is redirected to the home page, at the URL "/" by clicking
   on the Home link in the navigation bar`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`the application is redirected to the About page, in the URL "/about",
   by clicking on the About link in the navigation bar.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`the application is redirected to the Favorite Pokémon page, in the URL "/favorites",
   by clicking on the Favorite Pokémons link in the navigation bar.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`the application is redirected to the "Not Found" page when entering
   an unknown URL.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/xablau');
    expect(getByText(/not found/i)).toBeInTheDocument();
  });
});
