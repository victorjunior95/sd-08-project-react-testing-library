import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('checks if the favorite pokemons page loads correctly', () => {
  test('No Favorite Pokemon found message if the user didnt add any favorites', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorites = getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  test('Adding pokemons to favorites', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More details/i);
    const buttonFavorites = getByText(/Favorite Pokémons/i);

    fireEvent.click(buttonDetails);
    const markFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(markFavorite);
    fireEvent.click(buttonFavorites);
    const pokemonCard = document.querySelector('.pokemon-overview');
    expect(pokemonCard).toBeInTheDocument();
  });
});
