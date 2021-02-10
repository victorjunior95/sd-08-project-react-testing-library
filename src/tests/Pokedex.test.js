import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';
import favoritesID from '../__mocks__/favoritesID';

describe('Requisito 5 <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesID } />,
    );
    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesID } />,
    );
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();
  });
  test('Os próximos Pokémons da lista devem ser mostrados, ao clicar no botão; ',
    () => {
      const { getByRole, getByText } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesID } />,
      );
      const button = getByRole('button', {
        name: /Próximo pokémon/i,
      });
      fireEvent.click(button);
      const charmander = getByText('Charmander');
      expect(charmander).toBeInTheDocument();
      fireEvent.click(button);
      const caterpie = getByText('Caterpie');
      expect(caterpie).toBeInTheDocument();
      fireEvent.click(button);
      const ekans = getByText(/ekans/i);
      expect(ekans).toBeInTheDocument();
      fireEvent.click(button);
      const alakazam = getByText(/alakazam/i);
      expect(alakazam).toBeInTheDocument();
      fireEvent.click(button);
      const mew = getByText(/mew/i);
      expect(mew).toBeInTheDocument();
      fireEvent.click(button);
      const rapidash = getByText(/rapidash/i);
      expect(rapidash).toBeInTheDocument();
      fireEvent.click(button);
      const snorlax = getByText(/snorlax/i);
      expect(snorlax).toBeInTheDocument();
      fireEvent.click(button);
      const dragonair = getByText(/dragonair/i);
      expect(dragonair).toBeInTheDocument(); fireEvent.click(button);
      const pikachu = getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
    });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesID } />,
    );
    const name = getAllByTestId('pokemon-name');
    const type = getAllByTestId('pokemonType');
    const weight = getAllByTestId('pokemon-weight');

    expect(name).toHaveLength(1);
    expect(type).toHaveLength(1);
    expect(weight).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesID } />,
    );
    const type = getByTestId('pokemonType');
    const button = getByRole('button', {
      name: /dragon/i,
    });
    fireEvent.click(button);
    expect(type.innerHTML).toBe('Dragon');
    expect(button.innerHTML).toEqual(type.innerHTML);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesID } />,
    );
    const type = getByTestId('pokemonType');
    const buttonAll = getByRole('button', {
      name: /all/i,
    });
    const buttonDragon = getByRole('button', {
      name: /dragon/i,
    });
    expect(buttonAll).toHaveProperty('disabled', false);
    expect(buttonAll.innerHTML).toEqual('All');
    fireEvent.click(buttonDragon);
    expect(type.innerHTML).toBe('Dragon');
    fireEvent.click(buttonAll);
    expect(type.innerHTML).toEqual('Electric');
  });
  test('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.',
    () => {
      const { getAllByTestId, getAllByRole, getByRole } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesID } />,
      );
      const typesLength = 7;
      const button = getAllByTestId('pokemon-type-button');
      expect(button).toHaveLength(typesLength);

      const fire = getAllByRole('button', {
        name: /fire/i,
      });
      const psychic = getAllByRole('button', {
        name: /psychic/i,
      });
      const electric = getAllByRole('button', {
        name: /electric/i,
      });
      const normal = getAllByRole('button', {
        name: /normal/i,
      });
      expect(fire).toHaveLength(1);
      expect(psychic).toHaveLength(1);
      expect(electric).toHaveLength(1);
      expect(normal).toHaveLength(1);

      const buttonAll = getByRole('button', {
        name: /all/i,
      });

      expect(buttonAll).toBeInTheDocument();
    });
  test('O botão de Próximo pokémon deve ser desabilitado ....',
    () => {
      const { getByRole } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritesID } />,
      );
      const button = getByRole('button', {
        name: /Próximo pokémon/i,
      });
      const dragonBtn = getByRole('button', {
        name: /dragon/i,
      });
      expect(button).toBeInTheDocument();
      fireEvent.click(dragonBtn);
      expect(button).toHaveProperty('disabled', true);
    });
});
