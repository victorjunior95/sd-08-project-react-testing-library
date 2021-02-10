import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const titletext = screen.getByText(/Encountered pokémons/i);
    expect(titletext).toBeInTheDocument();
  });

  test('Exibe o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();
    userEvent.click(btnNextPokemon);
    const pokemonName = screen.getByText(/Charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const typeArray = ['Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const allTypes = 7;
    expect(allButtons.length).toBe(allTypes);
    typeArray.forEach((type) => {
      const pokeButton = screen.getByText(type);
      const allButton = screen.getByText('All');
      expect(pokeButton).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      userEvent.click(pokeButton);
      const pokeType = screen.getByTestId('pokemonType');
      expect(pokeType).toHaveTextContent(type);
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const firstPokemon = screen.getByText('Pikachu');
    const allButton = screen.getByText('All');
    const nextPokemon = screen.getByText('Próximo pokémon');
    let pokemonType = screen.getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');
    userEvent.click(nextPokemon);
    pokemonType = screen.getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Fire');
    userEvent.click(allButton);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste o botão de filtro para cada tipo de Pokémon.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const btnElectric = screen.getByRole('button', { name: /Electric/i });
    expect(btnElectric).toBeInTheDocument();
    const btnFire = screen.getByRole('button', { name: /Fire/i });
    expect(btnFire).toBeInTheDocument();
    const btnBug = screen.getByRole('button', { name: /Bug/i });
    expect(btnBug).toBeInTheDocument();
    const btnPoison = screen.getByRole('button', { name: /Poison/i });
    expect(btnPoison).toBeInTheDocument();
    const btnPsychic = screen.getByRole('button', { name: /Psychic/i });
    expect(btnPsychic).toBeInTheDocument();
    const btnNormal = screen.getByRole('button', { name: /Normal/i });
    expect(btnNormal).toBeInTheDocument();
    const btnDragon = screen.getByRole('button', { name: /Dragon/i });
    expect(btnDragon).toBeInTheDocument();
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();
  });
});
