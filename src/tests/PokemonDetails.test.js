import React from 'react';
import { screen } from '@testing-library/react';
import renderwithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import mockFavorite from '../services/mockFavorite';
import mockPokemons from '../services/mockPokemons';

describe('Teste se as informações detalhadas do Pokémon '
+ 'selecionado são mostradas na tela', () => {
  it('A página deve conter um texto <name> Details,'
  + ' onde <name> é o nome do Pokémon', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons[0] }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: `${mockPokemons} Details` });
    expect(heading).toBeInTheDocument();
  });
});
