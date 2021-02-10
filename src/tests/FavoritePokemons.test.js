import { screen, render } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import pokemon from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found,'
    + ' se a pessoa não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons pokemons={ [] } />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const names = screen.getAllByTestId('pokemon-name');
    const type = screen.getAllByTestId('pokemonType');
    const weight = screen.getAllByTestId('pokemon-weight');
    const img = screen.getAllByAltText(/sprite/);
    const imgFavorite = screen.getAllByAltText(/marked/i);
    expect(names.length).toBe(pokemon.length);
    expect(type.length).toBe(pokemon.length);
    expect(weight.length).toBe(pokemon.length);
    expect(img.length).toBe(pokemon.length);
    expect(imgFavorite.length).toBe(pokemon.length);
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const names = screen.queryAllByTestId('pokemon-name');
    const type = screen.queryAllByTestId('pokemonType');
    const weight = screen.queryAllByTestId('pokemon-weight');
    const img = screen.queryAllByAltText(/sprite/);
    const imgFavorite = screen.queryAllByAltText(/marked/i);
    expect(names.length).toBe(0);
    expect(type.length).toBe(0);
    expect(weight.length).toBe(0);
    expect(img.length).toBe(0);
    expect(imgFavorite.length).toBe(0);
  });
});
