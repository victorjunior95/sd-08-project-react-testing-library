import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const isPokemonFavoriteById = {
  4: true,
  25: true,
  151: true,
};

const renderPokedex = () => renderWithRouter(
  <Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />,
);

const pokemonName = 'pokemon-name';
const nextPokemon = 'next-pokemon';
const pokemonTypeButton = 'pokemon-type-button';

describe('Teste o componente <Pokedex.js />', () => {
  it('Contém um heading h2 com o texto "Encountered pokémons"', () => {
    const { getByText } = renderPokedex();

    const h2 = getByText(/Encountered pokémons/);
    expect(h2).toBeInTheDocument();
  });

  describe('Exibe o próximo Pokémon quando o botão "Próximo pokémon" é clicado', () => {
    it('O botão deve conter o texto Próximo pokémon', () => {
      const { getByTestId } = renderPokedex();

      const firstPokemon = getByTestId(pokemonName);
      expect(firstPokemon).toHaveTextContent('Pikachu');

      const nextPokemonButton = getByTestId(nextPokemon);

      userEvent.click(nextPokemonButton);

      const secondPokemon = getByTestId(pokemonName);
      expect(secondPokemon).toHaveTextContent('Charmander');
    });
    it(`Os próximos Pokémons da lista devem ser mostrados,
    um a um, ao clicar sucessivamente no botão`, () => {
      const { getByTestId } = renderPokedex();

      const nextPokemonButton = getByTestId(nextPokemon);

      for (let index = 0; index < pokemons.length; index += 1) {
        const currentPokemonName = getByTestId(pokemonName);
        expect(currentPokemonName).toBeInTheDocument();
        userEvent.click(nextPokemonButton);
      }
    });
    it(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
    se estiver no último Pokémon da lista`, () => {
      const { getByTestId } = renderPokedex();

      const nextPokemonButton = getByTestId(nextPokemon);

      const fistPokemonName = getByTestId(pokemonName);

      for (let index = 0; index < pokemons.length; index += 1) {
        userEvent.click(nextPokemonButton);

        if (index === pokemons.length - 1) {
          const currentPokemonName = getByTestId(pokemonName);
          expect(currentPokemonName).toBe(fistPokemonName);
        }
      }
    });
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderPokedex();

    const allPokemonNames = getAllByTestId(pokemonName);
    expect(allPokemonNames).toHaveLength(1);
  });

  describe('Teste se a Pokédex tem os botões de filtro', () => {
    it(`A partir da seleção de um botão de tipo, a Pokédex deve 
    circular somente pelos pokémons daquele tipo.`, () => {
      const { getAllByTestId, getByTestId } = renderPokedex();

      const numberOfPokemonTypeButtons = 7;

      const filtersButton = getAllByTestId(pokemonTypeButton);
      expect(filtersButton).toHaveLength(numberOfPokemonTypeButtons);
      expect(filtersButton[1]).toHaveTextContent('Fire');

      const currentPokemonName = getByTestId(pokemonName);
      const nextPokemonButton = getByTestId(nextPokemon);

      userEvent.click(filtersButton[1]);
      expect(currentPokemonName).toHaveTextContent('Charmander');
      userEvent.click(nextPokemonButton);
      expect(currentPokemonName).toHaveTextContent('Rapidash');
      userEvent.click(nextPokemonButton);
      expect(currentPokemonName).toHaveTextContent('Charmander');
    });
    it(`O texto do botão deve corresponder ao nome do tipo, 
    ex. Psychic`, () => {
      const { getAllByTestId } = renderPokedex();

      const types = [...new Set(pokemons.map(({ type }) => type))];
      const filtersButton = getAllByTestId(pokemonTypeButton);

      filtersButton.forEach((filterButton) => {
        expect(types.includes(filterButton.textContent)).toBeTruthy();
      });
    });
  });

  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    it('O texto do botão deve ser All', () => {
      const { getByText } = renderPokedex();

      const allButton = getByText('All');
      expect(allButton).toHaveTextContent('All');
    });
    it(`A Pokedéx deverá mostrar os Pokémons normalmente 
    (sem filtros) quando o botão All for clicado`, () => {
      const { getByText, getByTestId } = renderPokedex();

      const allButton = getByText('All');
      expect(allButton).toHaveTextContent('All');

      const currentPokemonName = getByTestId(pokemonName);
      expect(currentPokemonName).toHaveTextContent('Pikachu');

      const nextPokemonButton = getByText('Próximo pokémon');
      const filterPoisonButton = getByText('Poison');

      userEvent.click(filterPoisonButton);
      expect(currentPokemonName).toHaveTextContent('Ekans');
      userEvent.click(allButton);
      expect(currentPokemonName).toHaveTextContent('Pikachu');
      userEvent.click(nextPokemonButton);
    });
    it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
      const { getByText, getByTestId } = renderPokedex();

      const allButton = getByText('All');
      expect(allButton).toHaveTextContent('All');

      const currentPokemonName = getByTestId(pokemonName);
      expect(currentPokemonName).toHaveTextContent('Pikachu');
    });
  });

  test('Se os botões de filtros são criados automaticamente', () => {
    const { getAllByTestId, getByText } = renderPokedex();

    const pokeTypes = [...new Set(pokemons.map(({ type }) => type))];
    const filtersButton = getAllByTestId('pokemon-type-button');
    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();

    pokeTypes.forEach((pokemonType, index) => {
      expect(filtersButton[index]).toHaveTextContent(pokemonType);
    });

    const nextPokemonButton = getByText('Próximo pokémon');
    const filterBugButton = getByText('Bug');

    userEvent.click(filterBugButton);
    expect(nextPokemonButton.disabled).toBeTruthy();
  });
});
