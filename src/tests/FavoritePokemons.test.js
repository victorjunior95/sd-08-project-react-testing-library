import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('req 3', () => {
  it('no favorite pokemon', () => {
    const { getByText } = render(<FavoritePokemons />);
    const title = getByText('No favorite pokemon found');

    expect(title).toBeInTheDocument();
  });

  it('with favorite pokemon', () => {
    const { getByText, queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [pokemons[0]] } />,
    );
    const pikachu = getByText('Pikachu');
    const charmander = queryByText('Charmander');
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeNull();
  });
});
