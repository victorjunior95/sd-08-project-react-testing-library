import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

describe('Tests "Pokedex" component', () => {
  it('renders a subheading with the text `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);

    const subHeading = getByRole('heading', { level: 2 });
    expect(subHeading).toHaveTextContent('Encountered pokémons');
  });

  it('tests button to get next pokémon', () => {
    const { getByTestId, getByText, getAllByTestId } = renderWithRouter(<App />);

    const renderedPokemon = getByTestId('pokemon-name');
    const nextPokemon = getByText('Próximo pokémon');
    const filters = getAllByTestId('pokemon-type-button');

    expect(renderedPokemon).toHaveTextContent(pokemons[0].name);

    for (let i = 0; i < pokemons.length; i += 1) {
      expect(filters.some((button) => button.innerHTML === pokemons[i].type))
        .toBeTruthy();
      fireEvent.click(nextPokemon);
      if (i < (pokemons.length - 1)) {
        expect(renderedPokemon).toHaveTextContent(pokemons[i + 1].name);
      } else {
        expect(renderedPokemon).toHaveTextContent(pokemons[0].name);
      }
    }
  });

  it('tests pokémon filters', () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(<App />);

    const renderedType = getByTestId('pokemonType');
    const filters = [getByText('All'), ...getAllByTestId('pokemon-type-button')];

    expect(renderedType.innerHTML).toBe(pokemons[0].type);

    for (let i = 0; i < filters.length; i += 1) {
      fireEvent.click(filters[i]);
      if (filters[i].innerHTML === 'All') {
        expect(renderedType).toHaveTextContent(pokemons[0].type);
      } else {
        expect(renderedType.innerHTML).toBe(filters[i].innerHTML);
      }
    }

    const allTypes = pokemons.reduce((acc, val) => (acc
      .includes(val.type) ? acc : [...acc, val.type]), []);

    expect(allTypes.length).toBe(filters.length - 1);
  });
});
