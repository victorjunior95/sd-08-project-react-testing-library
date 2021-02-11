import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const favoritePokemons = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Requisito 5 - Teste o componente \\"Pokedex"\\', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.',
    () => {
      const { getByRole } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
      );
      const titleMain = getByRole('heading', {
        name: /encountered pokémons/i,
      });
      expect(titleMain).toBeInTheDocument();
    });

  it(`Teste se é exibido o próximo Pokémon
    da lista quando o botão Próximo pokémon é clicado`,
  () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
    );

    const btnNext = getByRole('button', { name: 'Próximo pokémon' });

    const lengthPokemons = pokemons.length - 1;

    pokemons.forEach((pokemon, index) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(btnNext);
      const nextPokemon = index === lengthPokemons ? 0 : index + 1;
      expect(getByText(pokemons[nextPokemon].name)).toBeInTheDocument();
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
    );
    const getPokemonName = getAllByTestId('pokemon-name');
    const getPokemonType = getAllByTestId('pokemonType');
    const getPokemonWeight = getAllByTestId('pokemon-weight');
    expect(getPokemonName).toHaveLength(1);
    expect(getPokemonType).toHaveLength(1);
    expect(getPokemonWeight).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
    );

    const btnAll = getByRole('button', { name: /all/i });
    const btnDragon = getByRole('button', { name: /dragon/i });
    const nextPokemon = getByRole('button', { name: /próximo pokémon/i });

    expect(btnAll).toBeInTheDocument();
    expect(btnDragon).toBeInTheDocument();
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(btnDragon);
    expect(getByText(/dragonair/i)).toBeInTheDocument();

    userEvent.click(btnAll);
    expect(getByText(/pikachu/i));
    userEvent.click(nextPokemon);
    expect(getByText(/charmander/i));
  });

  it('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.',
    () => {
      const numberTypes = pokemons.reduce((accumulator, value) => {
        if (!accumulator.includes(value.type)) accumulator = [...accumulator, value.type];
        return accumulator;
      }, []);

      const { getAllByTestId, getByText } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
      );

      const btnAll = getByText(/all/i);
      const nextPokemon = getByText(/próximo pokémon/i);
      const allBtnFilters = getAllByTestId('pokemon-type-button');
      expect(allBtnFilters.length).toBe(numberTypes.length);
      expect(btnAll).toBeDefined();
      expect(nextPokemon).toBeDefined();
    });

  it(`O botão de Próximo pokémon deve ser
    desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.`,
  () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
    );

    const btnBug = getByRole('button', { name: /bug/i });
    userEvent.click(btnBug);
    const btnNext = getByRole('button', { name: /próximo pokémon/i });
    expect(btnNext).toBeDisabled();
  });
});
