import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('primeira leva de testes', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        pokemons={ [pokemons[0], pokemons[1]] }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />
    </Router>,
  );
  const textoHeading = screen.getByText('Encountered pokémons');

  expect(textoHeading).toBeInTheDocument();
  const proximoButton = screen.getByText('Próximo pokémon');
  expect(proximoButton).toBeInTheDocument();
  userEvent.click(proximoButton);
  const nextPokemon = screen.getByText('Charmander');
  expect(nextPokemon).toBeInTheDocument();
});
test('Testa se é mostrado apenas um Pokémon por vez', () => {
  const pokemon = [pokemons[0]];
  render(
    <Router history={ createMemoryHistory() }>
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false } }
      />
    </Router>,
  );

  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
  expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
});

test('Testa se a Pokédex tem os botões de filtro', () => {
  const pokemon = [pokemons[0], pokemons[1], pokemons[6]];
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
      />
      ,
    </Router>,
  );

  const filterButton = screen.getByRole('button', { name: 'Fire' });
  expect(filterButton).toBeInTheDocument();

  const numberOfType = 2;
  const buttonTypeId = screen.getAllByTestId('pokemon-type-button');
  expect(buttonTypeId.length).toEqual(numberOfType);

  userEvent.click(filterButton);
  expect(screen.getByText('Charmander')).toBeInTheDocument();
});
test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
  const pokemon = [pokemons[0], pokemons[1]];
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />
      ,
    </Router>,
  );

  const allPokemons = screen.getByText('All');
  expect(allPokemons).toBeInTheDocument();

  userEvent.click(allPokemons);
  const numberOfPokemons = 2;
  expect(pokemon.length).toEqual(numberOfPokemons);
});
