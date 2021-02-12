import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokedex } from '../components';
import mockPokemons from '../services/mockPokemons';
import mockFavorite from '../services/mockFavorite';

const POKEMON_NAME = 'pokemon-name';
const PROXIMO_POKEMON = 'Próximo pokémon';
const POKE_TYPE_BUTTONS = 'pokemon-type-button';

const pokemonNameTest = (pokemon) => {
  const button = screen.getByRole('button', { name: PROXIMO_POKEMON });
  const pokemonName = screen.getByTestId(POKEMON_NAME);
  expect(pokemonName.textContent).toBe(pokemon.name);
  userEvent.click(button);
};

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });
});

describe('Teste se é exibido o próximo Pokémon da lista quando o'
  + 'botão Próximo pokémon é clicado', () => {
  it('O botão deve conter o texto Próximo pokémon;', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: PROXIMO_POKEMON });
    expect(button).toBeInTheDocument();
  });

  it('Os próximos Pokémons da lista devem ser mostrados,'
    + ' um a um, ao clicar sucessivamente no botão;', () => {
    renderWithRouter(<App />);
    pokemons.forEach(pokemonNameTest);
  });
  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,'
    + ' se estiver no último Pokémon da lista;', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: PROXIMO_POKEMON });
    pokemons.forEach(() => {
      userEvent.click(button);
    });
    const pokemon1 = screen.getByTestId(POKEMON_NAME);
    expect(pokemon1.textContent).toBe('Pikachu');
  });
});

describe('Teste o componente <Pokedex.js /> - 3', () => {
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: PROXIMO_POKEMON });
    pokemons.forEach(() => {
      const pokemon = screen.getAllByTestId(POKEMON_NAME);
      expect(pokemon.length).toBe(1);
      userEvent.click(button);
    });
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it('A partir da seleção de um botão de tipo, a Pokédex'
    + ' deve circular somente pelos pokémons daquele tipo;', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const firePokemons = mockPokemons.filter((pokemon) => pokemon.type === 'Fire');
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    const button = screen.getByRole('button', { name: PROXIMO_POKEMON });
    userEvent.click(fireButton);
    const pokemonName = screen.getByTestId(POKEMON_NAME).textContent;
    expect(pokemonName).toBe(firePokemons[0].name);
    userEvent.click(button);
    const pokemonName1 = screen.getByTestId(POKEMON_NAME).textContent;
    expect(pokemonName1).toBe(firePokemons[1].name);
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    const pokeName = screen.getByTestId('pokemonType').textContent;
    expect(pokeName).toBe(electricButton.textContent);
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton.textContent).toBe('All');
  });

  it('A Pokedéx deverá mostrar os Pokémons normalmente'
    + ' (sem filtros) quando o botão All for clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const allBtn = screen.getByRole('button', { name: 'All' });
    const nextBtn = screen.getByRole('button', { name: PROXIMO_POKEMON });
    userEvent.click(allBtn);
    const firstPoke = screen.getByTestId(POKEMON_NAME);
    expect(firstPoke.textContent).toBe(mockPokemons[0].name);
    userEvent.click(nextBtn);
    const secondPoke = screen.getByTestId(POKEMON_NAME);
    expect(secondPoke.textContent).toBe(mockPokemons[1].name);
    userEvent.click(nextBtn);
    const thirdPoke = screen.getByTestId(POKEMON_NAME);
    expect(thirdPoke.textContent).toBe(mockPokemons[2].name);
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const nextBtn = screen.getByRole('button', { name: PROXIMO_POKEMON });
    const firstPoke = screen.getByTestId(POKEMON_NAME);
    expect(firstPoke.textContent).toBe(mockPokemons[0].name);
    userEvent.click(nextBtn);
    const secondPoke = screen.getByTestId(POKEMON_NAME);
    expect(secondPoke.textContent).toBe(mockPokemons[1].name);
    userEvent.click(nextBtn);
    const thirdPoke = screen.getByTestId(POKEMON_NAME);
    expect(thirdPoke.textContent).toBe(mockPokemons[2].name);
  });
});

describe('Teste se é criado, dinamicamente,'
  + ' um botão de filtro para cada tipo de Pokémon', () => {
  it('Os botões de filtragem devem ser dinâmicos.'
  + ' Deve existir um botão de filtragem para cada tipo de Pokémon disponível'
  + ' nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons'
  + ' do tipo Fire, Psychic, Electric e Normal', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const mockPokeBtn = mockPokemons.reduce((acc, curr) => {
      if (acc.includes(curr.type)) return [...acc];
      return [...acc, curr.type];
    }, []);
    const screenBtn = screen.getAllByRole('button');
    const textScreenBtn = screenBtn.map((btn) => btn.textContent);
    const textScreenBtnWithoutAll = textScreenBtn.slice(1, textScreenBtn.length - 1);
    expect(mockPokeBtn.entries === textScreenBtnWithoutAll.entries).toBe(true);
  });

  it('Deve ser mostrado como opção de filtro, um botão para cada um dos tipos.'
    + ' Além disso, o botão All precisa estar sempre visível.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const mockPokeBtn = mockPokemons.reduce((acc, curr) => {
      if (acc.includes(curr.type)) return [...acc];
      return [...acc, curr.type];
    }, []);
    const screenBtn = screen.getAllByTestId(POKE_TYPE_BUTTONS);
    const allBtn = screen.getByRole('button', { name: 'All' });
    const textScreenBtn = screenBtn.map((btn) => btn.textContent);
    // const textScreenBtnWithoutAll = textScreenBtn.slice(1, textScreenBtn.length - 1);
    expect(mockPokeBtn.entries === textScreenBtn.entries).toBe(true);
    expect(allBtn).toBeInTheDocument();
  });
});

describe('Teste o componente <Pokedex.js /> - 7', () => {
  it('O botão de Próximo pokémon deve ser desabilitado quando'
  + ' a lista filtrada de Pokémons tiver um só pokémon.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    const nextBtn = screen.getByRole('button', { name: PROXIMO_POKEMON });
    expect(nextBtn).toBeDisabled();
  });
});
