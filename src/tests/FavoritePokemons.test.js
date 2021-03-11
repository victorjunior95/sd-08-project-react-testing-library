import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test component FavoritePokemons', () => {
  it('should have the message "No favorite pokemon found"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFavoriteFound = getByText('No favorite pokemon found');
    expect(noFavoriteFound).toBeInTheDocument();
  });

  it('should show the pokemons marked as favorites', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const btnMoreDetails = getByText('More details');
    fireEvent.click(btnMoreDetails);
    const checkboxFavoritePokemon = getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkboxFavoritePokemon);
    const linkFavoritePokemons = getByText('Favorite Pokémons');
    fireEvent.click(linkFavoritePokemons);
    const favoritesContainer = document.querySelector('.favorite-pokemons');
    expect(favoritesContainer).toBeInTheDocument();
  });
});
