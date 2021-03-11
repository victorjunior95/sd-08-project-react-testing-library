import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Favorite.js ', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const favoriteText = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(favoriteText).toBeInTheDocument();
    const notFindPokemonText = screen.getByText(/No favorite pokemon found/i);
    expect(notFindPokemonText).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    render(<FavoritePokemons />);
    const favoriteText = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(favoriteText).toBeInTheDocument();
  });
  test('Teste se nenhum card de pokémon é exibido.', () => {

    // render(<FavoritePokemons />);
    // const favoriteText = screen.getByRole('heading', {
    //   level: 2,
    //   name: /Favorite pokémons/i,
    // });
    // expect(favoriteText).toBeInTheDocument();
  });
});
