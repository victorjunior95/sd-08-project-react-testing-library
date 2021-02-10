import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Button, Pokedex, Pokemon } from '../components';

describe('test pokemon component', () => {
  test('renders name, type and weight of a pokemon', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const name = getByTestId('pokemon-name');
    console.log(name.innerHTML);
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pikachu');
    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toBe('Electric');
    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
  });
});
