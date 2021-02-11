import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Requirement 05', () => {
  it('Teste 01 - Página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);
    const title = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(title).toBeInTheDocument();
  });

  it('Teste 02 - É exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Teste 03 - É mostrado apenas um Pokémon por vez.', () => {
    const { container } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);
    const showPokemon = container.querySelectorAll('.pokemon');
    expect(showPokemon).toHaveLength(1);
  });

  it('Teste 04 - Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);
    const types = ['Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const qtyTypes = 7;
    expect(buttons.length).toBe(qtyTypes);
    types.forEach((type) => {
      const btnPokemon = screen.getByText(type);
      const allButton = screen.getByText('All');
      expect(btnPokemon).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      userEvent.click(btnPokemon);
      const typePokemon = screen.getByTestId('pokemonType');
      expect(typePokemon).toHaveTextContent(type);
    });
  });

  it('Teste 05 - Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);
    const pikachu = screen.getByText('Pikachu');
    const allButton = screen.getByText('All');
    const nextPokemon = screen.getByText('Próximo pokémon');
    let pokemonType = screen.getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');
    userEvent.click(nextPokemon);
    pokemonType = screen.getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Fire');
    userEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste 06 - Botão de filtro criado dinamicamente para cada tipo de Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
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
