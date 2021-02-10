import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favorite = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: true,
  148: false,
  151: false,
};

describe('Testa o componenete "Pokedex"', () => {
  test('a página contém um h2 com o texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  test('é exibido o próximo pokemon quando clicar "Próximo pokemon"', () => {
    const { getByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);

    const charmander = 2;
    const dragonair = 9;

    const nextBtn = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(queryByText(/pikachu/i)).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    userEvent.click(nextBtn);
    expect(queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(queryByText(/charmander/i)).toBeInTheDocument();

    for (let i = charmander; i <= dragonair; i += 1) {
      userEvent.click(nextBtn);
    }
    expect(queryByText(/pikachu/i)).toBeInTheDocument();
  });

  test('é mostrado apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('a pokédex tem os botões de filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);

    userEvent.click(getByRole('button', {
      name: /bug/i,
    }));
    let pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Bug');

    userEvent.click(getByRole('button', {
      name: /electric/i,
    }));
    pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  test('a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);

    const nextBtn = getByRole('button', {
      name: /próximo pokémon/i,
    });

    const allBtn = getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();

    let previousPokemonType = getByTestId('pokemonType').innerHTML;
    userEvent.click(nextBtn);
    expect(getByTestId('pokemonType').innerHTML).not.toBe(previousPokemonType);

    userEvent.click(getByRole('button', {
      name: /bug/i,
    }));
    userEvent.click(allBtn);
    previousPokemonType = getByTestId('pokemonType').innerHTML;
    userEvent.click(nextBtn);
    expect(getByTestId('pokemonType').innerHTML).not.toBe(previousPokemonType);
  });

  test('é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);

    const typesQtd = 7;

    const typesBtn = getAllByTestId('pokemon-type-button');
    expect(typesBtn.length).toBe(typesQtd);
  });

  test('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);

    const nextBtn = getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(getByRole('button', {
      name: /electric/i,
    }));
    expect(nextBtn).toBeDisabled();
  });
});
