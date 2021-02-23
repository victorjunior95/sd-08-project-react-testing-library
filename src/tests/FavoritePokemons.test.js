import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('test the FavoritePokemons component', () => {
  it('case hasnt favorites, shows the message "No favorite pokemon found"', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFavoritesText = getByText(/No favorite pokemon found/i);

    expect(noFavoritesText).toBeInTheDocument();
  });

  it('shows every card of favorites pokemons', () => {
    const { container } = renderWithRouter(
      <FavoritePokemons
        pokemons={ pokemons }
      />,
    );

    expect(container
      .getElementsByClassName('favorite-pokemon').length)
      .toBe(pokemons.length);
  });

  it('no card should be shown if not favorited', () => {
    const { container } = render(<FavoritePokemons />);

    expect(container.getElementsByClassName('favorite-pokemons').length).toBe(0);
  });
});
