import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3', () => {
  it('should have no favorite pokemon', () => {
    const { queryByText, getAllByText } = renderWithRouter(<FavoritePokemons />);
    if (!localStorage.FavoritePokemons) {
      const noPokemonText = queryByText(/No favorite pokemon found/i);
      expect(noPokemonText).toBeInTheDocument();
    } else {
      const noPokemonText = queryByText(/No favorite pokemon found/i);
      expect(noPokemonText).not.toBeInTheDocument();
      const favoritePokemonFromLocalStorage = JSON.parse(localStorage.FavoritePokemons);
      const pokemonsCard = getAllByText(/More details/i);
      expect(favoritePokemonFromLocalStorage.length).toBe(pokemonsCard.length);
    }
  });
});
