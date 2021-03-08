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
    const { getByText, getByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    const firstpokemonName = getByText(pokemons[0].name);
    expect(firstpokemonName).toBeInTheDocument();
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

  it('verifies if the button is disabled', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemon }
    />);

    const dragonButton = getByRole('button', {
      name: 'Dragon',
    });
    fireEvent.click(dragonButton);

    const nextButton = getByRole('button', {
      name: nextPokemon,
    });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
});
