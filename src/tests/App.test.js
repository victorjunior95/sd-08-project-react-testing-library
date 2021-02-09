import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('should renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('it should renders Pokédex in URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const titlePokedex = getByText('Encountered pokémons');
    expect(titlePokedex).toBeInTheDocument();
  });

  it('should have links in nav', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: 'Home',
    });
    const linkAbout = getByRole('link', {
      name: 'About',
    });
    const linkFavorite = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('should redirects to Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: 'Home',
    });
    fireEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('should redirects to About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkAbout = getByRole('link', {
      name: 'About',
    });
    fireEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('should redirects to Favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkFavorite = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    fireEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('should redirect to not found', () => {
    const { history, queryByText } = renderWithRouter(<App />);
    const notFoundText = queryByText(/Page requested not found/i);
    expect(notFoundText).not.toBeInTheDocument();
    history.push('/naofuncionar');
    expect(notFoundText).not.toBeInTheDocument();
  });
});
