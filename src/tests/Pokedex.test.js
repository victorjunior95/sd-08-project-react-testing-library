import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from './mock/pokemons';

describe(' Teste o componente <Pokedex.js />', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons. ', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );

    const subtitle = getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(subtitle).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );

    const btnNextPoke = getByRole('button', {
      name: /próximo pokémon/i,
    });

    const pokemonCurrent = getByText(/Pikachu/);
    expect(pokemonCurrent).toBeInTheDocument();
    fireEvent.click(btnNextPoke);
    const pokemonNext = getByText(/Charmander/);
    expect(pokemonNext).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez.', () => {
    const { container } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );
    const pokemon = container.querySelectorAll('.pokemon');
    expect(pokemon).toHaveLength(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );

    const btnFilter = getAllByTestId('pokemon-type-button');
    expect(btnFilter).toHaveLength(2);

    const btnFire = getByRole('button', {
      name: /Fire/i,
    });
    fireEvent.click(btnFire);
    const pokemonFireFirst = getByText(/Charmander/i);
    expect(pokemonFireFirst).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );
    const btnReset = getByRole('button', {
      name: /all/i,
    });
    const btnNextPoke = getByRole('button', {
      name: /próximo pokémon/i,
    });

    fireEvent.click(btnReset);

    const pokemonCurrent = getByText(/Pikachu/);
    expect(pokemonCurrent).toBeInTheDocument();
    fireEvent.click(btnNextPoke);
    const pokemonNext = getByText(/Charmander/);
    expect(pokemonNext).toBeInTheDocument();
  });

  test('se é criado, um botão de filtro para cada tipo de Pokémon.', () => {
    const listPokemon = [{
      id: 0,
      name: 'Testing',
      type: 'Model',
      averageWeight: {
        value: '0.0',
        measurementUnit: 'kg',
      },
      image: '',
      moreInfo: '',
      foundAt: [],
      summary:
        '',
    }];

    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ listPokemon }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );

    const btnNextPoke = getByRole('button', {
      name: /Model/i,
    });

    expect(btnNextPoke).toBeInTheDocument();
  });

  test('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );
    const btnFilter = getByRole('button', {
      name: /Electric/i,
    });
    fireEvent.click(btnFilter);
    const btnNextPoke = getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnNextPoke.disabled).toBe(true);
  });
});
