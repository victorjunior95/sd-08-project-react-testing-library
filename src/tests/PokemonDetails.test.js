import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

const DETAILS = 'More details';

describe('Tests "PokemonDetails" component', () => {
  it('renders detailed pokemon info', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    const details = getByText(DETAILS);
    fireEvent.click(details);

    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();

    const subHeadings = getAllByRole('heading', { level: 2 });
    expect(subHeadings).toContain(getByText(`${pokemons[0].name} Details`));
    expect(subHeadings).toContain(getByText(`Game Locations of ${pokemons[0].name}`));
    expect(subHeadings).toContain(getByText('Summary'));

    const paragraph = getByText(pokemons[0].summary);
    expect(paragraph).toBeInTheDocument();
  });

  it('tests pokemon location rendering', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    fireEvent.click(getByText(DETAILS));
    const renderedLocations = getAllByAltText(`${pokemons[0].name} location`);

    expect(renderedLocations.length).toBe(pokemons[0].foundAt.length);

    for (let i = 0; i < pokemons[0].foundAt.length; i += 1) {
      const { location, map } = pokemons[0].foundAt[i];
      expect(renderedLocations[i].src).toBe(map);
      expect(getByText(location)).toBeInTheDocument();
    }
  });

  it('tests favorite assignment', () => {
    const { getByText, getByLabelText, queryByText } = renderWithRouter(<App />);

    const testSequence = () => {
      fireEvent.click(getByText(DETAILS));
      fireEvent.click(getByLabelText('Pokémon favoritado?'));
      fireEvent.click(getByText('Home'));
    };

    const nextCounter = (n) => {
      for (let i = 0; i < n; i += 1) {
        fireEvent.click(getByText('Próximo pokémon'));
      }
    };

    testSequence();
    nextCounter(1);
    testSequence();
    nextCounter(2);
    testSequence();

    fireEvent.click(getByText('Favorite Pokémons'));

    expect(getByText(pokemons[0].name)).toBeInTheDocument();
    expect(getByText(pokemons[1].name)).toBeInTheDocument();
    expect(getByText(pokemons[2].name)).toBeInTheDocument();
    expect(queryByText(pokemons[3].name)).toBeNull();

    fireEvent.click(getByText('Home'));

    nextCounter(2);
    testSequence();

    fireEvent.click(getByText('Favorite Pokémons'));
    expect(queryByText(pokemons[2].name)).toBeNull();
  });
});
