import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const testids = ['pokemon-name', 'pokemonType', 'pokemon-weight'];
describe('Pokemon', () => {
  test('pikachu', () => {
    const history = createMemoryHistory();
    const pikachu = pokemons[0];
    render(
      <Router history={ history }>
        <Pokemon pokemon={ pikachu } showDetailsLink isFavorite />
      </Router>,
    );
    expect(screen.getByTestId(testids[0]).textContent).toBe('Pikachu');
    expect(screen.getByTestId(testids[1]).textContent).toBe('Electric');
    expect(screen.getByTestId(testids[2]).textContent).toBe('Average weight: 6.0 kg');
    expect(screen.getByAltText(`${pikachu.name} sprite`)).toHaveProperty(
      'src',
      pikachu.image,
    );
    expect(screen.getByAltText(`${pikachu.name} is marked as favorite`)).toHaveProperty(
      'src',
      'http://localhost/star-icon.svg',
    );
    expect(screen.getByText(/More details/).href).toBe(`http://localhost/pokemons/${pikachu.id}`);
  });
});
