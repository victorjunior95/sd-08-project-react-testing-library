import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

describe('Testing the FavoritePokemons.js component', () => {
  it(`if the message 'No favorite pokemon found' is displayed on the screen, 
  if the person does not have favorite pokemon.`, () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const msg = getByText(/No favorite pokemon found/i);

    expect(msg).toBeInTheDocument();
  });

  it('whether all favorite Pokémon cards are displayed', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    const pokemonsNames = getAllByTestId('pokemon-name');

    expect(pokemonsNames.length).toBe(pokemons.length);
  });

  it('if no Pokémon card is displayed, if it is not favored', () => {
    const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const pokemonsNames = queryAllByTestId('pokemon-name');

    expect(pokemonsNames.length).toBe(0);
  });
});
