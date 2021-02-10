import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const types = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

const numberOfButtonsExpected = 7;

test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const pokemonFound = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokemonFound).toBeInTheDocument();
});

const pokemonName = 'pokemon-name';

test('Se é exibido o próximo Pokémon da lista quando "Próximo pokémon" é clicado', () => {
  renderWithRouter(<App />);

  const previusPokemon = { ...screen.getByTestId(pokemonName) };
  const nextPokemonButton = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  fireEvent.click(nextPokemonButton);
  const actualPokemon = { ...screen.getByTestId(pokemonName) };

  expect(previusPokemon).not.toBe(actualPokemon);

  while (screen.getByTestId(pokemonName).innerHTML !== 'Dragonair') {
    fireEvent.click(nextPokemonButton);
  }
  fireEvent.click(nextPokemonButton);

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});

test('Se é mostrado apenas um Pokémon por vez.', () => {
  renderWithRouter(<App />);

  const pokemonFound = screen.getAllByRole('link', {
    name: /More details/i,
  });
  expect(pokemonFound.length).toBe(1);
});

test('Se a Pokédex tem os botões de filtro.', () => {
  renderWithRouter(<App />);

  const buttonsFound = screen.getAllByRole('button')
    .map((button) => button.innerHTML)
    .filter((type) => types.includes(type));

  expect(buttonsFound.length).toBe(numberOfButtonsExpected);

  const buttonFire = screen.getByRole('button', {
    name: 'Fire',
  });
  fireEvent.click(buttonFire);
  expect(screen.getByTestId('pokemonType').innerHTML).toBe('Fire');

  const nextPokemonButton = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  fireEvent.click(nextPokemonButton);
  expect(screen.getByTestId('pokemonType').innerHTML).toBe('Fire');

  fireEvent.click(nextPokemonButton);
  expect(screen.getByTestId('pokemonType').innerHTML).toBe('Fire');
});

test('Se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);

  const nextPokemonButton = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  const pokemonsNames = pokemons.map((pokemon) => pokemon.name);

  pokemonsNames.map((name) => {
    expect(screen.getByTestId(pokemonName).innerHTML).toBe(name);
    return fireEvent.click(nextPokemonButton);
  });

  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  expect(allButton).toBeInTheDocument();

  fireEvent.click(allButton);

  pokemonsNames.map((name) => {
    expect(screen.getByTestId(pokemonName).innerHTML).toBe(name);
    return fireEvent.click(nextPokemonButton);
  });
});

test('Se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.', () => {
  renderWithRouter(<App />);

  const typesButtons = screen.getAllByTestId('pokemon-type-button');
  expect(typesButtons.length).toBe(numberOfButtonsExpected);
});

test('Se o botão de Próximo pokémon é desabilitado', () => {
  renderWithRouter(<App />);

  const nextPokemonButton = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });

  const bugFilter = screen.getByRole('button', {
    name: 'Bug',
  });
  fireEvent.click(bugFilter);

  expect(nextPokemonButton).toBeDisabled();
});
