import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
// import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

// The next constant es made due to esLint requests
// it is the dataTestId value present in the Pokedex.js file.
// This file have gotten code contributions from Ana Karine
// and Rosiele David:
// https://github.com/tryber/sd-07-project-react-testing-library/pull/91/files
// https://github.com/tryber/sd-08-project-react-testing-library/pull/72/files
// Used with their express permission; this means, they are aware
// of the usage of their codes.
const nextPokemonTestId = 'next-pokemon';

describe('Requirement 5, testing Pokédex component', () => {
  test('if there is a level 2 heading "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    expect(getByRole('heading')).toHaveTextContent(/Encountered pokémons/i);
  });
});

describe('Test if next Pokémon is exhibited when button is clicked', () => {
  test('If the button contains "Próximo Pokémon" as its text', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    expect(getByTestId(nextPokemonTestId)).toHaveTextContent('Próximo pokémon');
  });

  test('If next Pokémon listed is shown when its button is clicked', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    pokemons.forEach((pok) => {
      expect(getByText(pok.name)).toBeInTheDocument();
      fireEvent.click(getByTestId(nextPokemonTestId));
    });
  });

  test('If first Pok is shown when clicking the last one listed', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const magicNumberOfPokemons = 9;
    for (let i = 0; i < magicNumberOfPokemons; i += 1) {
      fireEvent.click(getByTestId(nextPokemonTestId));
    }
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('If one Pokémon is shown at a time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });
});

describe('Testing if Pokédex has filter buttons', () => {
  test('If after selecting a type, the Pokédex show the related ones', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const magical = 7;
    const buttonFilter = getAllByTestId('pokemon-type-button').length;
    expect(buttonFilter).toBe(magical);
  });

  test('if button text is "All"', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    expect(getByText(/All/i)).toBeInTheDocument();
    fireEvent.click(getByText(/All/i));
    expect(pokemons.length.toString()).toBe('9');
  });

  test('Next pokémon button disables when there is just one Pokemon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btn = getByText('Dragon', { selector: 'button' });
    fireEvent.click(btn);
    expect(getByText(/Próximo pokémon/i)).toBeDisabled();
  });
});
