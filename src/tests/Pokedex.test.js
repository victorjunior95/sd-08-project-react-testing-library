import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Pokedex', () => {
  it('page contains an h2 header with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });
  it('the next Pokémon in the list is displayed by clicking the pŕoximo pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    //  font: line 18 ~ 28 of https://github.com/tryber/sd-08-project-react-testing-library/blob/vivi/src/tests/Pokedex.test.js
    const pokemons = [
      'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew',
      'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu',
    ];
    pokemons.forEach((poke) => {
      userEvent.click(button);
      const pokemon = getByText(poke);
      expect(pokemon).toBeInTheDocument();
    });
  });
  it('the buttons appear on the screen and filter the pokedex', () => {
    const { getByRole, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const seven = 7;
    expect(getAllByTestId('pokemon-type-button')).toHaveLength(seven);
    //  font: line 43 ~ 53 https://github.com/tryber/sd-08-project-react-testing-library/blob/vivi/src/tests/Pokedex.test.js
    const typeTest = (type) => {
      const typeButton = getByRole('button', { name: type });
      userEvent.click(typeButton);
      expect(getByTestId('pokemonType')).toHaveTextContent(type);
      if (type === 'Fire' || type === 'Psychic') {
        const firstPokemon = getByTestId('pokemon-name');
        const nextButton = getByTestId('next-pokemon');
        userEvent.click(nextButton);
        const secondPokemon = getByTestId('pokemon-name');
        expect(firstPokemon).not.toHaveTextContent(secondPokemon);
      }
    };
    typeTest('Electric');
    typeTest('Fire');
    typeTest('Psychic');
  });
  it('Pokédex contains a button to reset the filter', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const filterButton = getByRole('button', {
      name: /All/i,
    });
    userEvent.click(filterButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
