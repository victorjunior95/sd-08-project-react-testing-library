import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const isFavorite = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testa Componente <Pokedex />', () => {
  it('Testa se a mensagem "Encountered pokémons" renderiza', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const textOnScreen = getByText('Encountered pokémons');

    expect(textOnScreen).toBeInTheDocument();
  });

  it('Testa se o próximo Pokemon Renderiza ao clicar "Próximo Pokemon"', () => {
    const { getByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const THIRD_POKEMON_INDEX = 3;
    const LAST_POKEMON_INDEX = 9;

    const nextButton = getByRole('button', { name: /próximo pokémon/i });

    expect(queryByText(/pikachu/i)).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(queryByText(/charmander/i)).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(queryByText(/charmander/i)).not.toBeInTheDocument();
    expect(queryByText(/caterpie/i)).toBeInTheDocument();

    for (let i = THIRD_POKEMON_INDEX; i <= LAST_POKEMON_INDEX; i += 1) {
      userEvent.click(nextButton);
    }
    expect(queryByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Testa se somente um pokemon renderiza por vez', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('Testa se o filtro por tipo Funciona/renderiza corretamente', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    userEvent.click(getByRole('button', { name: /bug/i }));
    let pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Bug');

    userEvent.click(getByRole('button', { name: /electric/i }));
    pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  it('Testa se o Botão "All" reseta o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });

    const allButton = getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    let previousPokemonType = getByTestId('pokemonType').innerHTML;
    userEvent.click(nextButton);
    expect(getByTestId('pokemonType').innerHTML).not.toBe(previousPokemonType);

    userEvent.click(getByRole('button', { name: /bug/i }));
    userEvent.click(allButton);
    previousPokemonType = getByTestId('pokemonType').innerHTML;
    userEvent.click(nextButton);
    expect(getByTestId('pokemonType').innerHTML).not.toBe(previousPokemonType);
  });

  it('Testa se os Filtros por tipos são gerados dinâmicamente', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const TYPES_QUANTITY = 7;

    const pokemonTypesButtons = getAllByTestId('pokemon-type-button');
    expect(pokemonTypesButtons.length).toBe(TYPES_QUANTITY);
  });

  it('Testa se o botão próximo é desabilitado caso só tenha um pokemon no filtro', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(getByRole('button', { name: /electric/i }));
    expect(nextButton).toBeDisabled();
  });
});
