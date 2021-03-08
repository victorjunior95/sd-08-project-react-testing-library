import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWitheRouter';

import App from '../App';

import { Pokedex } from '../components';
import pokemons from '../data';

const favoritePokemon = {
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

const nextPokemon = 'Próximo pokémon';

describe('Pokedex Test', () => {
  it('Verifies if the page has a <h2> and if it has the correct text', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const getH2 = getByRole('heading', { level: 2 });
    expect(getH2).toBeInTheDocument();
    const text = getByText('Encountered pokémons');
    expect(text).toBeInTheDocument();
  });
  it('Verifies if the button /Proximo Pokémon/ is working well', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const button = getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Próximo pokémon');

    fireEvent.click(button);

    const pokemon = getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });

  it('verifies if only one pokemon is being rendered at time', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const pokemonNames = getAllByTestId('pokemon-name');
    expect(pokemonNames).toHaveLength(1);
  });

  it('shows only filtered pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const psychicButton = getByRole('button', {
      name: 'Psychic',
    });
    expect(psychicButton).toBeInTheDocument();
    fireEvent.click(psychicButton);

    const pokemonName = getByText('Alakazam');
    expect(pokemonName).toBeInTheDocument();

    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    fireEvent.click(nextButton);
    let nextPokemonName = getByText('Mew');
    expect(nextPokemonName).toBeInTheDocument();

    fireEvent.click(nextButton);
    nextPokemonName = getByText('Alakazam');
    expect(nextPokemonName).toBeInTheDocument();
  });
});
