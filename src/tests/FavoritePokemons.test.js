import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';

import { FavoritePokemons } from '../components';

import pokemons from '../data';

describe('Tests <FavoritePokemons /> component', () => {
  it('should contain the text "No favorite pokemon found" if there is no pokémon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('should render the favorite pokemóns cards', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });

  it('should not render if no pokemón is favorited', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});
