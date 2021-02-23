import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Requisito 3', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/);
    expect(msg).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0], pokemons[1]] } />);
    const divs = document.querySelectorAll('.favorite-pokemon');
    expect(divs).toHaveLength(2);
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const divs = document.querySelectorAll('.favorite-pokemon');
    expect(divs).toHaveLength(0);
  });
});
