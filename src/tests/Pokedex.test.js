import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const allFavs = { 4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Requisito 5', () => {
  it('Teste se página contém o botao All', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ allFavs }
    />);
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });

  it('Teste se página contém o botao de Type', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ allFavs }
    />);
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBeGreaterThan(0);
  });

  it('Teste se página contém o Type Fire', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ allFavs }
    />);
    const electricButton = screen.getByText('Fire');
    expect(electricButton).toBeInTheDocument();
  });

  it('Teste se página contém o botao proximo', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ allFavs }
    />);
    const proximoBtn = screen.getByText('Próximo pokémon');
    expect(proximoBtn).toBeInTheDocument();
  });
});
