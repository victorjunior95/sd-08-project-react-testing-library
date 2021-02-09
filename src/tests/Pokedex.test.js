import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('tests for Pokedex.js', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByRole } = renderWithRouter(<Pokedex pokemons={ ['Pikachu', 'Charmander'] } />);
    expect(getByRole(
      'heading', { level: 2, name: /Encountered pokémons/ },
    )).toBeInTheDocument();
  });
});
