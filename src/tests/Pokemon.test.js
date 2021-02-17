import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import { PokemonDetails } from '../components';

const Pikachu = pokemons[0];
// const POKEMON_NAME = 'pokemon-name';

describe('Favorite Pokemons page', () => {
  it('should display a card with the pokemon information`', () => {
    const { getByTestId, getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ Pikachu } isFavorite={ false } />,
    );
    const name = getByTestId('pokemon-name').textContent;
    expect(name).toBe('Pikachu');
    const type = getByTestId('pokemonType').textContent;
    expect(type).toBe('Electric');
    const weight = getByTestId('pokemon-weight').textContent;
    expect(weight).toBe('Average weight: 6.0 kg');
    const img = getAllByRole('img')[0];
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('should have a link to redirect to the pokemon details`', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ Pikachu } isFavorite={ false } />,
    );
    const pokemonDetail = getByText('More details');
    fireEvent.click(pokemonDetail);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('should have a star icon if the pokemon is favorited`', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ Pikachu } isFavorite />,
    );
    const img = getAllByRole('img')[1];
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
