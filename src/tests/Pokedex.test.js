import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const ids = pokemons.map(({ id }) => id);
const favorites = ids.reduce((acc, curr) => ({ ...acc, [curr]: false }), {});
const types = pokemons.reduce((acc, curr) => {
  if (!acc.includes(curr.type)) return [...acc, curr.type];
  return acc;
}, []);

const idPokemonName = 'pokemon-name';

describe('Requisito 5', () => {
  it('Verifica o título e se há somente um pokemon', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const title = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
    expect(getAllByTestId(idPokemonName)).toHaveLength(1);
  });

  it('Ao clicar no botão proximo pokemon, apenas o próximo é renderizado', () => {
    const { getByTestId, getByRole, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const nextBtn = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextBtn).toBeInTheDocument();
    pokemons.forEach(({ name }) => {
      expect(getAllByTestId(idPokemonName)).toHaveLength(1);
      expect(getByTestId(idPokemonName)).toHaveTextContent(name);
      userEvent.click(nextBtn);
    });
    const firstPokemon = pokemons[0].name;
    expect(getByTestId(idPokemonName)).toHaveTextContent(firstPokemon);
  });

  it('Verifica botões de filtro para cada tipo', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const allBtn = getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    expect(getAllByTestId('pokemon-type-button')).toHaveLength(types.length);
    types.forEach((type) => {
      expect(getByRole('button', { name: type })).toBeInTheDocument();
    });
  });

  it('Verifica se os filtros funcionam', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    types.forEach((type) => {
      const filterBtn = getByRole('button', { name: type });
      userEvent.click(filterBtn);
      const filteredPokemons = pokemons.filter(
        ({ type: typeSelected }) => type === typeSelected,
      );
      filteredPokemons.forEach(({ name }) => {
        expect(getByTestId(idPokemonName)).toHaveTextContent(name);
        userEvent.click(getByRole('button', { name: /Próximo/ }));
      });
    });
    const filterBtn = getByRole('button', { name: 'All' });
    userEvent.click(filterBtn);
    pokemons.forEach(({ name }) => {
      expect(getByTestId(idPokemonName)).toHaveTextContent(name);
      userEvent.click(getByRole('button', { name: /Próximo/ }));
    });
  });

  it('Botão próximo pokemon é desabilitado quando só há um pokemon filtrado', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const typesWithOnePokemon = types.filter((type) => (
      pokemons.filter(({ type: filtered }) => type === filtered).length === 1
    ));

    typesWithOnePokemon.forEach((type) => {
      const filterBtn = getByRole('button', { name: type });
      userEvent.click(filterBtn);
      expect(getByRole('button', { name: /Próximo/ })).toBeDisabled();
    });
  });
});
