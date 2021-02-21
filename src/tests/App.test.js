import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Requisito 1, App.js', () => {
  test('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('App.js should be rendered in the pathname "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('There should be nav links', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkHome = getByText('Home');
    const linkAbout = getByText('About');
    const linkFavorite = getByText('Favorite Pokémons');

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
  test('Should be redirect to home page when "Home" is clicked', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { pathname } = history.location;
    userEvent.click(getByText('Home'));
    expect(pathname).toBe('/');
  });
  test('Should be redirect to about page when "About" is clicked', () => {
    const { history, getByText } = renderWithRouter(<App />);
    userEvent.click(getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Should be redirect to favorites page when "Favorite Pokémons" is clicked', () => {
    const { history, getByText } = renderWithRouter(<App />);
    userEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
