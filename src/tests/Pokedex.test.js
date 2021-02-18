import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
  },
];

const isPokemonFavoriteById = { 25: false, 4: false };

test('se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const heading = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(heading).toBeInTheDocument();
});

describe('se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  test('se o botão contém o texto Próximo pokémon', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const nextPokemonButton = getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
  });
  test('se os próximos Pokémons são mostrados ao clicar no botão ', () => {
    const { getByRole, queryByText, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const nextPokemonButton = getByRole('button', { name: /próximo pokémon/i });
    const firstPokemon = getByText('Pikachu');

    expect(firstPokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    expect(queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(queryByText(/charmander/i)).toBeInTheDocument();
  });

  test('se o primeiro Pokémon da lista é mostrado após último Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const totalPokemons = 8;
    const nextPokemonButton = getByText('Próximo pokémon');
    for (let index = 1; index <= totalPokemons; index += 1) {
      userEvent.click(nextPokemonButton);
    }
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});

test('se é mostrado apenas um Pokémon por vez ', () => {
  const { getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const pokemon = getAllByTestId('pokemon-name'); // vem do componente Pokemon
  expect(pokemon.length).toBe(1);
});

describe('se a Pokédex tem os botões de filtro', () => {
  test('se acionado o botão de tipo, circula nos Pokémons só do tipo', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const eletricTypeButton = getByRole('button', { name: /electric/i });
    userEvent.click(eletricTypeButton);
    const pokemonType = getByTestId('pokemonType'); // vem do Pokemon.js
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  test('se o texto do botão corresponde ao nome do tipo, ex. Psychic;', () => {
    const { getByRole } = renderWithRouter(<App />);
    const typeButtonPsychic = getByRole('button', { name: /psychic/i });
    userEvent.click(typeButtonPsychic);
    expect(typeButtonPsychic.textContent).toBe('Psychic');
  });
});

describe('se a Pokédex contém um botão para resetar o filtro', () => {
  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const { getByText } = renderWithRouter(<App />);
    const firstPokemon = getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
  test('se o texto do botão de resetar filtro é All', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allButton = getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
  });
  test('se mostra todos os Pokémons quando o botão All for clicado', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allButton = getByRole('button', { name: /all/i });
    const firePokemonButton = getByRole('button', { name: /fire/i });
    userEvent.click(firePokemonButton);
    expect(getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(allButton);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});

test('se é criado um botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const pokemonsTypeButtons = getAllByTestId('pokemon-type-button');
  const numberOfTypes = 2;
  expect(pokemonsTypeButtons.length).toBe(numberOfTypes);
});

test('se botão Próximo pokémon é desabilitado', () => {
  const { getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const nextPokemonButton = getByRole('button', { name: /próximo pokémon/i });
  const filterButton = getByRole('button', { name: /electric/i });
  userEvent.click(filterButton);
  userEvent.click(nextPokemonButton);
  expect(nextPokemonButton).toBeDisabled();
});
