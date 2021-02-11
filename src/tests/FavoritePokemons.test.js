import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testing component Favorite Pokemons', () => {
  test('message "No favorite pokemon found" is in the page', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('all favorite cards is in the page', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    userEvent.click(getByText(/More details/i));
    userEvent.click(getByText(/Pokémon favoritado/i));
    userEvent.click(getByText(/Favorite pokémons/i));

    const favoritePokemon = getByTestId(/pokemon-name/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
