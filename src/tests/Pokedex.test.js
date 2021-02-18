import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import { isPokemonFavoriteByIdType } from '../types';
import Button from '../components/Button';

describe('Testes componente Pokedex.js', () => {
  it('Se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);
    const h2 = screen.getByText(/Encountered pokémons/i);

    expect(h2).toBeInTheDocument();
  });

  it(' teste Próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);
    const button = screen.getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toEqual('Próximo pokémon');

    userEvent.click(button);
    const nextPoke = screen.getByText(/Charmander/i);
    expect(nextPoke).toBeInTheDocument();
  });

  it('Botão Type', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);

    const buttonType = screen.getAllByTestId('pokemon-type-button')[1];
    expect(buttonType.innerHTML).toEqual('Fire');
    userEvent.click(buttonType);
    const Poke = screen.getByText(/charmander/i);
    expect(Poke).toBeInTheDocument();
  });

  it('Botão reset ALL', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);

    const button = screen.getByText('All');
    expect(button.innerHTML).toEqual('All');
    userEvent.click(button);
    const all = screen.getByText(/pikachu/i);
    expect(all).toBeInTheDocument();
  });
});
