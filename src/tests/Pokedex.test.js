import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import { Pokedex } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

const renderPokedex = ({ pokemons = data, isPokemonFavoriteById = {} } = {}) => (
  renderWithRouter(<Pokedex { ...{ pokemons, isPokemonFavoriteById } } />)
);

const nextPokemon = 'Próximo pokémon';
const testIds = {
  name: 'pokemon-name',
  type: 'pokemonType',
  buttonType: 'pokemon-type-button',
};
const pokemonTypes = new Set();
data.forEach((pokemon) => pokemonTypes.add(pokemon.type));
describe('requirement05', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderPokedex();
    expect(getByRole('heading', { level: 2, name: 'Encountered pokémons' }))
      .toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista quando o botão 
  Próximo pokémon é clicado`, () => {
    const { getByTestId, getByRole } = renderPokedex();
    const button = getByRole('button', { name: nextPokemon });
    const firstPokemon = getByTestId(testIds.name).textContent;
    expect(button).toBeInTheDocument();
    data.forEach((pokemon) => {
      expect(getByTestId(testIds.name).textContent).toBe(pokemon.name);
      userEvent.click(button);
    });
    const currentPokemon = getByTestId(testIds.name).textContent;
    expect(currentPokemon).toBe(firstPokemon);
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId, getByRole } = renderPokedex();
    data.forEach(() => {
      expect(getAllByTestId(testIds.name).length).toBe(1);
      userEvent.click(getByRole('button', { name: nextPokemon }));
    });
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByTestId, getByRole } = renderPokedex();
    pokemonTypes.forEach((type) => {
      const button = getByRole('button', { name: type });
      expect(button.textContent).toBe(type);
      userEvent.click(button);
      data.filter((pokemon) => pokemon.type === type).forEach(() => {
        expect(getByTestId(testIds.type).textContent).toBe(type);
        userEvent.click(getByRole('button', { name: nextPokemon }));
      });
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderPokedex();
    const checkAllPokemons = () => {
      data.forEach((pokemon) => {
        expect(getByTestId(testIds.name).textContent).toBe(pokemon.name);
        userEvent.click(getByRole('button', { name: nextPokemon }));
      });
    };
    checkAllPokemons();
    userEvent.click(getByRole('button', { name: 'All' }));
    checkAllPokemons();
  });

  test(`Teste se é criado, dinamicamente, 
  um botão de filtro para cada tipo de Pokémon`, () => {
    const oneOfEveryType = data.reduce((acc, cur) => {
      if (!acc.find((pokemon) => pokemon.type === cur.type)) {
        acc.push(cur);
      }
      return acc;
    }, []);

    const sliceA = oneOfEveryType.slice(0, 2);
    const sliceB = oneOfEveryType.slice(+'3');

    const pokedexA = renderPokedex({ pokemons: sliceA });
    expect(pokedexA.getAllByTestId(testIds.buttonType).length).toBe(sliceA.length);
    expect(pokedexA.getByRole('button', { name: 'All' })).toBeInTheDocument();

    cleanup();

    const pokedexB = renderPokedex({ pokemons: sliceB });
    expect(pokedexB.getAllByTestId(testIds.buttonType).length).toBe(sliceB.length);
    expect(pokedexB.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  test(`O botão de Próximo pokémon deve ser desabilitado quando
   a lista filtrada de Pokémons tiver um só pokémon`, () => {
    const { getByRole } = renderPokedex({ pokemons: [data[0]] });
    expect(getByRole('button', { name: nextPokemon })).toBeDisabled();
  });
});
