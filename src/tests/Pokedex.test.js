import React from 'react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const favorites = {
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

describe('teste requisito 5#', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons ', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const getH2Encoutred = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(getH2Encoutred).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista bt Próximo pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    // const getButtonNext = getByTestId(/next-pokemon/i);
    // userEvent.click(getButtonNext);
    const getButtonNext = getByText(/Próximo pokémon/i);
    userEvent.click(getButtonNext);

    const getNextPokemon = getByText(/charmander/i);

    expect(getNextPokemon).toBeInTheDocument();
    expect(getButtonNext).toBeInTheDocument();
  });
  it('proximo pokemon da lista deve ser mostrado 1 a 1', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const buttonNextPokemon = getByTestId(/next-pokemon/i);
    pokemons.forEach((pokemon) => {
      const getName = getByText(pokemon.name);
      userEvent.click(buttonNextPokemon);
      expect(getName).toBeInTheDocument();
    });
  });
  it('teste se o ultimo pokemon volta para o primeiro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const buttonNextPokemon = getByTestId(/next-pokemon/i);
    const FINAL_POSITION = 9;
    for (let index = 0; index < FINAL_POSITION; index += 1) {
      userEvent.click(buttonNextPokemon);
    }
    const firstPosition = getByText(/pikachu/i);
    expect(firstPosition).toBeInTheDocument(/pikachu/i);
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const buttonNextPokemon = getByTestId(/next-pokemon/i);
    for (let index = 0; index < pokemons.length; index += 1) {
      const namePokemon = getAllByRole('heading').length;
      expect(namePokemon).toBe(1);
      userEvent.click(buttonNextPokemon);
    }
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const buttonFilter = getAllByTestId(/pokemon-type-button/i).length;
    const LENGTH_FILTER = 7;
    expect(buttonFilter).toBe(LENGTH_FILTER);
  });
  it(' Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const buttonPsychic = getByRole('button', { name: 'Psychic' });
    const button = getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(buttonPsychic);
    expect(getByTestId('pokemonType').innerHTML).toBe('Psychic');
    userEvent.click(button);
    expect(getByTestId('pokemonType').innerHTML).toBe('Psychic');
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );

    const buttonReset = getByText('All');
    const buttonNext = getByText(/Próximo pokémon/i);
    const pokemonInitial = getByText('Pikachu');

    expect(buttonReset).toBeInTheDocument();
    expect(pokemonInitial).toBeInTheDocument();
    userEvent.click(buttonNext);
    let nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(buttonNext);
    nextPokemon = getByText('Caterpie');
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(buttonNext);
    nextPokemon = getByText('Ekans');
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(buttonReset);
    expect(pokemonInitial).toBeInTheDocument();
  });
  it(' um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const buttonAllFilters = getAllByTestId('pokemon-type-button');
    const NUMBER_OF_FILTER = 7;
    expect(buttonAllFilters.length).toBe(NUMBER_OF_FILTER);
  });
  it('O botão de Próximo pokémon deve ser desabilitado ', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const buttonNormal = getByRole('button', { name: 'Normal' });
    const buttonNext = getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(buttonNormal);
    expect(buttonNext.disable).toBe(true);
  });
});
