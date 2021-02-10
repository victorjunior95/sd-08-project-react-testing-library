import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const favoritePokemons = [pokemons[0], pokemons[1]];

describe('Favorite Pokemons page', () => {
  it('should display: `No favorite pokemon found`,'
  + ' if there is no pokemon favorited', () => {
    const { container } = renderWithRouter(<FavoritePokemons />);
    const notFound = container.querySelector('p');
    expect(notFound).toBeInTheDocument();
    expect(notFound.textContent).toBe('No favorite pokemon found');
  });
  it('should display the favorited pokemons cards', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const pokemonsCards = getAllByTestId('pokemon-name');
    expect(pokemonsCards[0].textContent).toBe('Pikachu');
    expect(pokemonsCards[1].textContent).toBe('Charmander');
  });
  it('should not display a pokemons cards that was not favorited', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const pokemonsCards = getAllByTestId('pokemon-name');
    const NotFavorited = pokemonsCards.some((item) => item.textContent === 'Alakazam');
    expect(NotFavorited).toBe(false);
  });
});
