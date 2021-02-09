import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('test App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('render home page', () => {
    const { history } = renderWithRouter(<App />);

    const homeText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(homeText).toBeInTheDocument();

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('links top page', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });

    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });

    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(favoriteLink).toBeInTheDocument();
  });

  it('home link test', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });

    userEvent.click(homeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('about link test', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('favorite pokemons link test', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(favoriteLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('not found page test', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/wiki');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });
});
