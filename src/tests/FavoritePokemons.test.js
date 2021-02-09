import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import favorites from './favorites';

describe('FavoritePokemons.js test', () => {
  it('mensagem No favorite pokemon found, se não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const pikachu = getByText(/pikachu/i);
    const charmander = getByText(/charmander/i);
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });
});
