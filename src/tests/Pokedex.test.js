import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import App from '../App';
import pokemons from '../data';

const pokemonTypes = [...new Set(pokemons.map((pokemon) => (pokemon.type)))];

describe('testing the <Pokedex.js /> component', () => {
  test('If the page contains an h2 heading with the text Encountered Pokémon.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );
    expect(screen.getByRole('heading')).toHaveTextContent(/Encountered pokémons/i);
  });

  test(`If the next Pokémon in the list is
   displayed when the Next Pokémon button is clicked.`, () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );

    expect(screen.getByTestId('next-pokemon')).toHaveTextContent(/Próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  test('If only one Pokémon is shown at a time.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );
    expect(screen.queryAllByTestId('pokemon-name').length).toBe(1);
  });

  test('If the Pokédex has the filter buttons.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );
    userEvent.click(screen.getByText('Fire'));
    pokemonTypes.forEach((type) => {
      userEvent.click(screen.getByText(type));
      pokemons.filter((pokemon) => pokemon.type === type).forEach((pokemon) => {
        expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
        userEvent.click(screen.getByTestId('next-pokemon'));
      });
    });
  });

  test('If the Pokédex contains a button to reset the filter', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('next-pokemon'));
    });

    expect(screen.getByText('All')).toBeInTheDocument();
    userEvent.click(screen.getByText('All'));
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
  });

  test('If a filter button is created dynamically for each type of Pokémon.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );
    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(pokemonTypes.length);
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  test(`If The Next Pokémon button should be disabled
    when the filtered list of Pokémon has only one Pokémon.`, () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );
    pokemonTypes.forEach((type) => {
      userEvent.click(
        screen.getAllByTestId('pokemon-type-button')
          .find((button) => button.innerHTML === type),
      );
      if (pokemons.filter((pokemon) => pokemon.type === type)
        .length === 1) {
        expect(screen.getByTestId('next-pokemon')).toBeDisabled();
      } else {
        expect(screen.getByTestId('next-pokemon')).not.toBeDisabled();
      }
    });
  });
});
