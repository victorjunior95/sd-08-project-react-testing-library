import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const fav = [
  {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  },
];

const pokemonFiltered = pokemons.filter((pokemon) => pokemon.type === 'Eletric'
  || pokemon.type === 'Psychic'
  || pokemon.type === 'Fire'
  || pokemon.type === 'Normal');

describe('req 5', () => {
  it('contem heading', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fav }
      />,
    );
    const title = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it('botão muda de pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fav }
      />,
    );
    const nextBut = getByTestId('next-pokemon');
    const pokemonName = getByTestId('pokemon-name');
    expect(nextBut.innerHTML).toBe('Próximo pokémon');
    for (let index = 0; index < fav.length; index += 1) {
      const oldPokemon = pokemonName.innerHTML;
      userEvent.click(nextBut);
      expect(pokemonName.innerHTML).not.toBe(oldPokemon);
    }
  });

  it('mosta apenas um pokemon', () => {
    const { queryAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fav }
      />,
    );
    const pokemonsName = queryAllByTestId('pokemon-name');
    expect(pokemonsName.length).toBe(1);
  });

  it('testando botão de filtro e all, e se next é disabilitado', () => {
    const { queryAllByTestId, getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemonFiltered }
        isPokemonFavoriteById={ fav }
      />,
    );
    const buttonsType = queryAllByTestId('pokemon-type-button');
    const pokemonType = getByTestId('pokemonType');
    const buttonNext = getByTestId('next-pokemon');
    const buttonAll = getByText('All');
    expect(buttonsType[0].innerHTML).toBe('Fire');
    userEvent.click(buttonsType[1]);
    expect(pokemonType.innerHTML).toBe('Psychic');
    userEvent.click(buttonAll);
    expect(pokemonType.innerHTML).toBe('Fire');
    expect(buttonNext.disabled).toBe(false);
    userEvent.click(buttonsType[2]);
    expect(buttonNext.disabled).toBe(true);
  });
});
