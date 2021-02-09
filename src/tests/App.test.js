import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Home page', () => {
  it('should render a reading the home path "/" with the text `Pokédex`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render a fixed navigation bar with links', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favoriteLink = getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should redirect to path "/" when "Home" link is accessed', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should redirect to path "/about" when "About" link is accessed', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should redirect to path "/favorites" when "Favorite Pokémons" link is accessed',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      userEvent.click(getByText('Favorite Pokémons'));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('should render "Not Found" page when typed an unrecognized URL', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/not-found');
    const pageNotFoundText = getByText(/not found/i);
    expect(pageNotFoundText).toBeInTheDocument();
  });
});
