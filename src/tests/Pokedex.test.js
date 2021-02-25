import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('', () => {
  test('test whether a level 2 header tag exists', () => {
    const { getByRole } = renderWithRouter(<App />);
    const header = getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(header).toBeInTheDocument();
  });
  test('test the "proximo pokemon" button', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const firstPokemon = getByText(pokemons[0].name);
    const nextButton = getByRole('button', { name: /próximo pokémon/i });

    expect(firstPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    expect(firstPokemon).toBeInTheDocument();
  });
  test('tests if exist only one pokemon on screen', () => {
    const ONE = 1;
    const { container } = renderWithRouter(<App />);
    const pokemonDiv = container.getElementsByClassName('pokemon').length;
    expect(pokemonDiv).toBe(ONE);
  });
  test('tests the button filter by type', () => {
    const psychPokemons = pokemons.filter((pokemon) => pokemon.type === /psychic/i);
    const { getByRole } = renderWithRouter(<App />);
    const psychButton = getByRole('button', { name: /psychic/i });
    psychPokemons.forEach((pokemon) => {
      expect(pokemon.name).toBeInTheDocument();
      userEvent.click(psychButton);
    });
  });
  test('tests the all filter button', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const allButton = getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');

    userEvent.click(allButton);
    const firstPokemon = getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const secondPokemon = getByText(pokemons[1].name);
    expect(secondPokemon).toBeInTheDocument();
  });
  test('tests whether all types of Pokémon have a button filter on the Pokédex panel',
    () => {
      const types = [
        'Electric',
        'Fire',
        'Bug',
        'Poison',
        'Psychic',
        'Normal',
        'Dragon',
      ];
      const { queryAllByTestId } = renderWithRouter(<App />);
      const typeButtons = queryAllByTestId('pokemon-type-button');
      expect(typeButtons.length).toBe(types.length);
      expect(typeButtons[0].textContent).toBe(types[0]);
    });
});
