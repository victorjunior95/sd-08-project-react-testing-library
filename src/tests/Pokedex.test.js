import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favorite = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Pokedex test component', () => {
  it('There should be an h2 on the page with the text Encountered Pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const h2 = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(h2).toBeInTheDocument();
  });

  it(`Should display the next Pokémon in the list when 
  the Next Pokémon button is clicked.`, () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );

    const btnNext = getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(btnNext).toBeInTheDocument();

    pokemons.forEach((pokemon, index, array) => {
      const firstPokemon = getByText(pokemon.name);
      expect(firstPokemon).toBeInTheDocument();

      userEvent.click(btnNext);
      const arLength = array.length - 1;
      const next = index === arLength ? 0 : index + 1;
      const nextPokemon = getByText(pokemons[next].name);
      expect(nextPokemon).toBeInTheDocument();
    });
  });

  it('Only one Pokémon should be displayed at a time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );

    const pokemonName = getAllByTestId('pokemon-name');
    const pokemonType = getAllByTestId('pokemonType');
    const pokemonWeight = getAllByTestId('pokemon-weight');
    expect(pokemonName).toHaveLength(1);
    expect(pokemonType).toHaveLength(1);
    expect(pokemonWeight).toHaveLength(1);
  });

  it('It must have the filter buttons.', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );

    const btnAll = getByRole('button', {
      name: 'All',
    });
    const btnElectric = getByRole('button', {
      name: 'Electric',
    });
    const btnFire = getByRole('button', {
      name: 'Fire',
    });
    const btnBug = getByRole('button', {
      name: 'Bug',
    }); const btnPoison = getByRole('button', {
      name: 'Poison',
    }); const btnPsychic = getByRole('button', {
      name: 'Psychic',
    }); const btnNormal = getByRole('button', {
      name: 'Normal',
    }); const btnDragon = getByRole('button', {
      name: 'Dragon',
    });

    expect(btnAll).toBeInTheDocument();
    expect(btnElectric).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();
    expect(btnBug).toBeInTheDocument();
    expect(btnPoison).toBeInTheDocument();
    expect(btnPsychic).toBeInTheDocument();
    expect(btnNormal).toBeInTheDocument();
    expect(btnDragon).toBeInTheDocument();

    const btnNext = getByRole('button', {
      name: 'Próximo pokémon',
    });

    const pikachu = getByText('Pikachu');

    userEvent.click(btnAll);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(btnNext);
    expect(getByText('Charmander')).toBeInTheDocument();

    expect(btnElectric).toBeInTheDocument();
    userEvent.click(btnElectric);
    expect(pikachu).toBeInTheDocument();

    userEvent.click(btnFire);
    expect(getByText('Charmander')).toBeInTheDocument();

    userEvent.click(btnBug);
    expect(getByText('Caterpie')).toBeInTheDocument();

    userEvent.click(btnPoison);
    expect(getByText('Ekans')).toBeInTheDocument();

    userEvent.click(btnPsychic);
    expect(getByText('Alakazam')).toBeInTheDocument();

    userEvent.click(btnNormal);
    expect(getByText('Snorlax')).toBeInTheDocument();

    userEvent.click(btnDragon);
    expect(getByText('Dragonair')).toBeInTheDocument();
  });

  it('a filter button must be created dynamically for each type of Pokémon.', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );

    const SEVEN = 7;
    const filterButtons = getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(SEVEN);

    const btnAll = getByRole('button', {
      name: 'All',
    });

    expect(btnAll).toBeDefined();
  });

  it(`The Next Pokémon button should be disabled
   when the filtered list of Pokémon has only one Pokémon.`, () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const btnNextPokemon = getByRole('button', {
      name: /Próximo pokémon/,
    });
    const btnBug = getByRole('button', {
      name: 'Bug',
    });
    userEvent.click(btnBug);
    expect(btnNextPokemon).toBeDisabled();
  });
});
