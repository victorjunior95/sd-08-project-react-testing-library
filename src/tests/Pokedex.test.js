import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('Teste se página contém um heading com o texto `Encountered pokémons`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testando o botão Próximo pokémon', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText('All'));

  for (let index = 0; index < pokemons.length; index += 1) {
    expect(getByText(pokemons[index].name)).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
  }
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const { container } = renderWithRouter(<App />);

  expect(container.querySelectorAll('.pokemon').length).toBe(1);
});

test('Teste o botão de Proximo pokemon', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText('Psychic'));

  const PsyPokemon = pokemons.filter((pokemon) => pokemon.type === 'Psychic');

  for (let index = 0; index < PsyPokemon.length; index += 1) {
    expect(getByText(PsyPokemon[index].name)).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
  }
  expect(getByText('Alakazam')).toBeInTheDocument();
});

test('Testando os filtros', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);

  const PokemonTypes = pokemons.reduce((types, { type }) => [...types, type], []);

  for (let index = 0; index < PokemonTypes.length; index += 1) {
    expect(getByRole('button', { name: PokemonTypes[index] })).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: PokemonTypes[index] }));

    if ((pokemons.filter((pokemon) => pokemon
      .type === PokemonTypes[index])).length === 1) {
      expect(getByText('Próximo pokémon').disabled).toBe(true);
    }
    expect(getByText('All')).toBeInTheDocument();
  }
});
