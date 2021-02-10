import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing component Pokedex.js', () => {
  test('The page must contain the h2 heading `Encountered Pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  describe('It must show the next pokemon after clicking '
  + 'the "Próximo pokémon" button', () => {
    test('The button must contain the text "Próximo pokémon"', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText('Próximo pokémon')).toBeInTheDocument();
    });

    test('The next pokémons on list must be shown,'
    + ' one at once, after each click on the button', () => {
      const { getByText } = renderWithRouter(<App />);
      const btnNextPokemon = getByText('Próximo pokémon');
      pokemons.forEach((currPokemon) => {
        expect(getByText(currPokemon.name)).toBeInTheDocument();
        userEvent.click(btnNextPokemon);
      });
    });
  });

  describe('The Pokédex must have filter buttons', () => {
    test('After clicking a filter button,'
    + ' it only shows that type of pokémons', () => {
      const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
      const pokemonFilterButtons = getAllByTestId('pokemon-type-button');

      pokemonFilterButtons.forEach((typeBtn) => {
        const pokemonType = typeBtn.textContent;
        const btnNextPokemon = getByTestId('next-pokemon');
        userEvent.click(typeBtn);
        expect(getByTestId('pokemonType').textContent).toBe(pokemonType);
        userEvent.click(btnNextPokemon);
      });
    });
  });

  test('There must be shown only one pokémon at once', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  describe('The Pokédex must contain a button to reset the filters', () => {
    test('The button must contain the text "All"', () => {
      const { getByText } = renderWithRouter(<App />);
      const btnAllPokemons = getByText('All');
      expect(btnAllPokemons).toBeInTheDocument();
    });
    test('After clicking the button, the pokédex must show all pokémons,'
    + ' with no filter', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const btnAllPokemons = getByText('All');
      userEvent.click(btnAllPokemons);
      expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
    });
  });
});
