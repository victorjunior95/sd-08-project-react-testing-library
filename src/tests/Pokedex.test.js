import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
};

const testIds = {
  pokemonName: 'pokemon-name',
  filterButton: 'pokemon-type-button',
  nextPokemon: 'next-pokemon',
};

const renderPokedex = () => renderWithRouter(
  <Pokedex
    pokemon={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />,
);

const getNumberOfPokemonsByType = (pokemonType) => (
  pokemons.filter(({ type }) => (
    pokemonType === 'all' || type.match(new RegExp(pokemonType, 'i'))
  )).length
);

const pokemonTypes = [...new Set(pokemons.map(({ type }) => type))];
const numberOfTypes = pokemonTypes.length;

const countFilteredPokemons = (selectors) => {
  const { getByTestId, getByRole } = selectors;
  const buttonNext = getByRole('button', { name: /Próximo pokémon/i });
  const result = new Set();
  let pokemonName = getByTestId(testIds.pokemonName).textContent;
  while (!result.has(pokemonName)) {
    result.add(pokemonName);
    userEvent.click(buttonNext);
    pokemonName = getByTestId(testIds.pokemonName).testContent;
  }
  return result.size;
};

test('The page contains an h2 heading with the text Encountered pokémons', () => {
  const { getByText } = renderPokedex();
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

describe(`The page displays the next Pokémon
on the list when the Next Pokémon button is clicked`, () => {
  test('The button should contain the text Next pokémon', () => {
    const { getByRole, getByTestId } = renderPokedex();
    const firstPokemon = getByTestId(testIds.pokemonName).textContent;
    const button = getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const secondPokemon = getByTestId(testIds.pokemonName).textContent;
    expect(firstPokemon).not.toBe(secondPokemon);
  });

  // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
  test(`The next Pokémon in the list must be shown,
  one by one, by successively clicking on the button`, () => {
    const { getByRole, getByTestId } = renderPokedex();
    let previousPokemon = getByTestId(testIds.pokemonName).textContent;
    const button = getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    for (let index = 0; index < pokemons.length; index += 1) {
      userEvent.click(button);
      const currentPokemon = getByTestId(testIds.pokemonName).textContent;
      expect(previousPokemon).not.toBe(currentPokemon);
      previousPokemon = currentPokemon;
    }
  });

  // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
  test(`The first Pokémon on the list should be shown by clicking the button,
  if it is on the last Pokémon on the list`, () => {
    const { getByRole, getByTestId } = renderPokedex();
    const firstPokemon = getByTestId(testIds.pokemonName).textContent;
    const button = getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    for (let index = 0; index < pokemons.length; index += 1) {
      userEvent.click(button);
    }
    expect(getByTestId(testIds.pokemonName).textContent).toBe(firstPokemon);
  });
});

test('The page shows only one Pokémon at a time', () => {
  const { getAllByTestId } = renderPokedex();
  expect(getAllByTestId(testIds.pokemonName).length).toBe(1);
});

describe('Pokedéx has the filter buttons', () => {
  // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo
  test(`From the selection of a type button, the Pokédex should
  only circulate through the Pokémon of that type`, () => {
    const { getByRole, getByTestId } = renderPokedex();
    const buttonFireFilter = getByRole('button', { name: /fire/i });
    userEvent.click(buttonFireFilter);
    const firstPokemon = getByTestId(testIds.pokemonName).textContent;
    const numberOfFirePokemons = getNumberOfPokemonsByType('fire');
    const buttonNext = getByRole('button', { name: /Próximo pokémon/i });
    for (let index = 0; index < numberOfFirePokemons; index += 1) {
      userEvent.click(buttonNext);
    }
    expect(getByTestId(testIds.pokemonName).textContent).toBe(firstPokemon);
  });

  // O texto do botão deve corresponder ao nome do tipo, ex. Psychic
  test('The button text must match the type name, eg. Psychic', () => {
    const { getAllByTestId } = renderPokedex();
    const types = [...new Set(pokemons.map(({ type }) => type))];
    const buttons = getAllByTestId(testIds.filterButton);
    const buttonsTypes = buttons.map(({ textContent }) => textContent);
    buttonsTypes.forEach((buttonType) => {
      expect(types.includes(buttonType)).toBeTruthy();
    });
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const pokedex = renderPokedex();
    const { getByRole } = pokedex;
    const numberOfFirePokemons = getNumberOfPokemonsByType('fire');
    const buttonFireFilter = getByRole('button', { name: /fire/i });
    userEvent.click(buttonFireFilter);
    const firePokemonsCount = countFilteredPokemons(pokedex);
    expect(firePokemonsCount).toBe(numberOfFirePokemons);
    const buttonAllFilter = getByRole('button', { name: /all/i });
    userEvent.click(buttonAllFilter);
    const numberOfPokemons = getNumberOfPokemonsByType('all');
    const allPokemonsCount = countFilteredPokemons(pokedex);
    expect(numberOfPokemons).toBe(allPokemonsCount);
  });

  test(`A Pokedéx deverá mostrar os Pokémons normalmente
(sem filtros) quando o botão All for clicado`, () => {
    const pokedex = renderPokedex();
    const { getByRole } = pokedex;
    const buttonFireFilter = getByRole('button', { name: /fire/i });
    userEvent.click(buttonFireFilter);
    const numberOfFirePokemons = getNumberOfPokemonsByType('fire');
    expect(countFilteredPokemons(pokedex)).toBe(numberOfFirePokemons);
    const buttonAllFilter = getByRole('button', { name: /all/i });
    userEvent.click(buttonAllFilter);
    const numberOfPokemons = getNumberOfPokemonsByType('all');
    expect(countFilteredPokemons(pokedex)).toBe(numberOfPokemons);
  });

  test(`Ao carregar a página, o filtro selecionado deverá
ser All`, () => {
    const pokedex = renderPokedex();
    const { history } = pokedex;
    expect(history.location.pathname).toBe('/');
    const numberOfPokemons = getNumberOfPokemonsByType('all');
    expect(countFilteredPokemons(pokedex)).toBe(numberOfPokemons);
  });
});

describe(`Teste se é criado, dinamicamente, um botão de filtro
para cada tipo de Pokémon.`, () => {
  test('Os botões de filtragem devem ser dinâmicos', () => {
    const getFavoritesObject = (pokemonsList) => pokemonsList.reduce((acc, cur) => {
      acc[cur.id] = true;
      return acc;
    }, {});

    const onePokemonOfEachType = pokemons.reduce((acc, cur) => {
      if (!acc.find((pokemon) => pokemon.type === cur.type)) {
        acc.push(cur);
      }
      return acc;
    }, []);

    const sliceA = onePokemonOfEachType.slice(0, 1);
    const sliceB = onePokemonOfEachType.slice(2);

    const pokedexA = renderWithRouter(
      <Pokedex
        pokemons={ sliceA }
        isPokemonFavoriteById={ getFavoritesObject(sliceA) }
      />,
    );

    expect(pokedexA.getAllByTestId(testIds.filterButton).length).toBe(sliceA.length);

    cleanup();

    const pokedexB = renderWithRouter(
      <Pokedex
        pokemons={ sliceB }
        isPokemonFavoriteById={ getFavoritesObject(sliceB) }
      />,
    );

    expect(pokedexB.getAllByTestId(testIds.filterButton).length).toBe(sliceB.length);
  });

  test(`Deve existir um botão de filtragem para cada tipo
  de Pokémon disponível nos dados, sem repetição. Ou seja, a sua
  Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric e Normal.`, () => {
    const pokedex = renderPokedex();
    const { getAllByTestId, getByRole } = pokedex;
    const buttonAllFilter = getByRole('button', { name: /all/i });
    userEvent.click(buttonAllFilter);
    expect(getAllByTestId(testIds.filterButton).length).toBe(numberOfTypes);
  });

  test(`Deve ser mostrado como opção de filtro, um botão para
  cada um dos tipos. Além disso, o botão All precisa estar sempre visível.`, () => {
    const pokedexA = renderPokedex();
    expect(pokedexA.getByRole('button', { name: /all/i })).toBeInTheDocument();

    cleanup();

    const pokedexB = renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0]] }
        isPokemonFavoriteById={ {} }
      />,
    );
    expect(pokedexB.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });
});

test(`O botão de Próximo pokémon deve ser desabilitado quando a lista
  filtrada de Pokémons tiver um só pokémon.`, () => {
  const pokedex = renderPokedex();
  const { getByRole, getByTestId } = pokedex;
  pokemonTypes.forEach((type) => {
    const button = getByRole('button', { name: new RegExp(type, 'i') });
    userEvent.click(button);
    const count = countFilteredPokemons(pokedex);
    const nextPokemon = getByTestId(testIds.nextPokemon);
    if (count <= 1) {
      expect(nextPokemon).toBeDisabled();
    } else {
      expect(nextPokemon).not.toBeDisabled();
    }
  });
});
