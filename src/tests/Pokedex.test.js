import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

import pokemons from '../data';

describe('Tests "Pokedex" component', () => {
  it('renders a subheading with the text `Encountered pokémons`', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const subHeading = getByRole('heading', { level: 2 });
    expect(subHeading).toHaveTextContent('Encountered pokémons');
  });

  it('tests button to get next pokémon', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const renderedPokemon = getByTestId('pokemon-name');
    const nextPokemon = getByText('Próximo pokémon');

    for (let i = 0; i < pokemons.length; i += 1) {
      expect(renderedPokemon).toHaveTextContent(pokemons[i].name);

      fireEvent.click(nextPokemon);
      if (i < (pokemons.length - 1)) {
        expect(renderedPokemon).toHaveTextContent(pokemons[i + 1].name);
      } else {
        expect(renderedPokemon).toHaveTextContent(pokemons[0].name);
      }
    }
  });

  it('tests pokémon filters', () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const renderedType = getByTestId('pokemonType');
    const filters = [getByText('All'), ...getAllByTestId('pokemon-type-button')];

    console.log(renderedType.innerHTML);
    expect(renderedType.innerHTML).toBe(pokemons[0].type);

    for (let i = 0; i < filters.length; i += 1) {
      fireEvent.click(filters[i]);
      if (filters[i].innerHTML === 'All') {
        expect(renderedType).toHaveTextContent(pokemons[0].type);
      } else {
        expect(renderedType.innerHTML).toBe(filters[i].innerHTML);
      }
    }
  });
});
