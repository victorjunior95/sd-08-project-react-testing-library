import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Favorite Pokemons test components', () => {
  it(`The message 'No favorite Pokémon found' should appear on the screen if 
  a person does not have a favorite Pokémon and no card should appear.`, () => {
    const { getByText, container } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();

    const noFavoriteCard = container.querySelector('.favorite-pokemons');
    expect(noFavoriteCard).toBe(null);
  });

  it('All favorite Pokémon cards should be displayed.', () => {
    const { getAllByTestId, getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    const pokemonsFavorites = getAllByTestId('pokemon-name');

    expect(pokemonsFavorites.length).toBe(pokemons.length);

    const pikachu = getByText('Pikachu');
    const charmander = getByText('Charmander');
    const caterpie = getByText('Caterpie');
    const ekans = getByText('Ekans');
    const alakazam = getByText('Alakazam');
    const mew = getByText('Mew');
    const rapidash = getByText('Rapidash');
    const snorlax = getByText('Snorlax');
    const dragonair = getByText('Dragonair');

    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
    expect(alakazam).toBeInTheDocument();
    expect(mew).toBeInTheDocument();
    expect(rapidash).toBeInTheDocument();
    expect(snorlax).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
  });
});
