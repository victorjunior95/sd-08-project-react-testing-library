import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Teste Favorite Pokemons', () => {
  test('Testa mensagem caso não haja pokémons favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i))
      .toBeInTheDocument();
  });

  test('Testa se há pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons
      pokemons={ [data[1]] }
    />);
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });

  test('Testa se não há determinado pokemon favoritado', () => {
    renderWithRouter(<FavoritePokemons
      pokemons={ [data[0]] }
    />);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.queryByText(/Caterpie/i)).not.toBeInTheDocument();
  });
});
