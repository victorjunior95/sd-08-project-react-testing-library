import React from 'react';
import pokemons from '../data';
import FavoritePokemons from '../components/FavoritePokemons';
import renderService from '../services/renderService';

describe('FavoritePokemons component testing', () => {
  it('Checks whether the message No favorite pokemon found is rendered', () => {
    const { getByText } = renderService(<FavoritePokemons pokemons={ [] } />);

    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('Checks whether to render all favorite Pokémon cards', () => {
    const { getAllByTestId } = renderService(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });
  it('Checks that no card is rendered if there are no favorites', () => {
    const { queryAllByTestId } = renderService(<FavoritePokemons pokemons={ [] } />);

    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});
