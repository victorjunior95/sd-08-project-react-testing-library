import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

test('Verifica se a pagina contém um heading H2', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ { 25: false } }
  />);
  const title = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(title).toBeInTheDocument();
});

test('Verifica se é exibido o próximo Pokémon da lista ao clicar no botão', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ { 25: false } }
  />);
  const button = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  expect(button).toBeInTheDocument();
  userEvent.click(button);

  const nextPokemon = screen.getByText(/Charmander/i);
  expect(nextPokemon).toBeInTheDocument();
});

test('Verifica se é mostrado apenas um Pokémon por vez', () => {
  const { container } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ { 25: false } }
  />);
  const viewPokemon = container.querySelectorAll('.pokemon');
  expect(viewPokemon).toHaveLength(1);
});

test('Verifica se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ { 25: false } }
  />);
  const types = ['Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const buttons = screen.getAllByTestId('pokemon-type-button');
  const qtyTypes = 7;
  expect(buttons.length).toBe(qtyTypes);
  types.forEach((type) => {
    const buttonPokemon = screen.getByText(type);
    const allButton = screen.getByText('All');
    expect(buttonPokemon).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    userEvent.click(buttonPokemon);
    const typePokemon = screen.getByTestId('pokemonType');
    expect(typePokemon).toHaveTextContent(type);
  });
});

test('Verifica se a Pokédex possui um botão para resetar o filtro', () => {
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

test('Verifica o botão de filtro criado dinamicamente', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ { 25: false } }
  />);
  const buttonElectric = screen.getByRole('button', { name: /Electric/i });
  expect(buttonElectric).toBeInTheDocument();
  const buttonFire = screen.getByRole('button', { name: /Fire/i });
  expect(buttonFire).toBeInTheDocument();
  const buttonBug = screen.getByRole('button', { name: /Bug/i });
  expect(buttonBug).toBeInTheDocument();
  const buttonPoison = screen.getByRole('button', { name: /Poison/i });
  expect(buttonPoison).toBeInTheDocument();
  const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
  expect(buttonPsychic).toBeInTheDocument();
  const buttonNormal = screen.getByRole('button', { name: /Normal/i });
  expect(buttonNormal).toBeInTheDocument();
  const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
  expect(buttonDragon).toBeInTheDocument();
  const buttonAll = screen.getByRole('button', { name: /All/i });
  expect(buttonAll).toBeInTheDocument();
});
