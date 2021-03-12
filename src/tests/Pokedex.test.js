import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const nextPokemon = 'Próximo pokémon';
const filteredPokemons = (array, next) => array.forEach((Pokemon) => {
  const element = getByText(Pokemon.name);
  expect(element).toBeInTheDocument();
  userEvent.click(next);
});

describe('tests the component Pokedex', () => {
  it('should render a h2 title with text Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const paragraph = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(paragraph).toBeInTheDocument();
  });

  it('should render the next pokémon by clicking Próximo pokémon button', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const next = getByRole('button', {
      name: nextPokemon,
    });
    expect(next).toBeInTheDocument();
    const clickerButton = () => userEvent.click(next);
    for (let i = 0; i < pokemons.length; i += 1) {
      clickerButton();
    }
    const Pikachu = getByText(/Pikachu/i);
    expect(Pikachu).toBeInTheDocument();
  });

  it('should render only one pokemon by time.', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: nextPokemon,
    });
    expect(button).toBeInTheDocument();
    const clickerButton = () => userEvent.click(button);
    for (let i = 0; i < pokemons.length; i += 1) {
      clickerButton();
      const pokemon = getAllByRole('img');
      expect(pokemon).toHaveLength(1);
    }
  });

  it('must have filter buttons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: 'Psychic',
    });

    userEvent.click(button);

    const filteringPokemons = pokemons
      .filter(
        ({ type }) => type === 'Psychic',
      );

    const next = getByRole('button', {
      name: nextPokemon,
    });

    expect.assertions(filteredPokemons.length);

    filteredPokemons(filteringPokemons, next);
  });

  it('should render all pokemons of same type of the clicked button', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: 'All',
    });

    userEvent.click(button);
    expect(button).toBeInTheDocument();

    const next = getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect.assertions(pokemons.length + 1);

    filteredPokemons(pokemons, next);
  });
  it('should render a button for each type of pokemons without repetition', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const pokemonTypes = pokemons.map(({ type }) => type);
    const pokemonTypesUniques = Array.from(new Set(pokemonTypes));
    const buttonPokemonTypes = getAllByTestId('pokemon-type-button');

    expect(buttonPokemonTypes).toHaveLength(pokemonTypesUniques.length);
  });
});
