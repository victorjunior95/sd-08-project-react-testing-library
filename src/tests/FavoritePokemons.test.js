import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('FavoritePokemons.js', () => {
  it('No favorite pokemon found is displayed on the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
  it('all favorite Pokémon cards are displayed', () => {
    const { getByRole, getByLabelText, getByText, getAllByAltText,
      history } = renderWithRouter(<App />);
    const buttonMoreDetails = getByRole('link', {
      name: /More details/i,
    });
    expect(buttonMoreDetails).toBeInTheDocument();
    userEvent.click(buttonMoreDetails);

    const inputFavorite = getByLabelText(/Pokémon favoritado/i);
    expect(inputFavorite).toBeInTheDocument();
    userEvent.click(inputFavorite);

    const favoriteButton = getByText(/Favorite Pokémons/i);
    userEvent.click(favoriteButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');

    const altStarIcons = getAllByAltText(/is marked as favorite/i);
    const zero = 0;
    expect(altStarIcons.length).not.toBe(zero);
  });
  it('no pokemon card is displayed', () => {
  // REalizado com a ajuda de https://medium.com/javascript-in-plain-english/testing-local-storage-with-testing-library-580f74e8805b
  // Eu poderia também ter realizado o caminho de desfavoritar o pokémon que eu havia favoritado
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });

    const { getByText, queryAllByAltText, history } = renderWithRouter(<App />);

    const favoriteButton = getByText(/Favorite Pokémons/i);
    userEvent.click(favoriteButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');

    const altStarIcons = queryAllByAltText(/is marked as favorite/i);
    const zero = 0;
    expect(altStarIcons.length).toBe(zero);
  });
});
