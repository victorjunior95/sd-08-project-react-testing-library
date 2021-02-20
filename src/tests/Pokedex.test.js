import React from 'react';
import { screen, render } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

describe('tests the Pokedex component', () => {
  it('contains <h2>Encountered pokémons</h2>', () => {
    render(<Pokedex />);

    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent(/Encountered pokémons/i);
  });

  it('', () => {});

  it('', () => {});

  it('', () => {});

  it('', () => {});

  it('', () => {});

  it('case list has just one pokémon, Próximo Pokémon btn would be disabled', () => {});
});
