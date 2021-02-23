import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Req III - Favorite Pokemons', () => {
  it(' 3.1 - should contains text massage No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const notFavoritePokemon = getByText('No favorite pokemon found');
    expect(notFavoritePokemon).toBeInTheDocument();
  });

  it('3.2 - should verify if there cards on favorite pokemons', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });

  it('3.3 - should verify if no there cards on favorite pokemons ', () => {
    const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});
