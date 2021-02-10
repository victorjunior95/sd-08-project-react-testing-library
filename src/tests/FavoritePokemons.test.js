import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Render <FavoritePokemons /> component,`', () => {
  it('show heading element with text `Favorite pokémons`', () => {
    render(<FavoritePokemons />);
    const heading = screen.getByRole('heading', { name: /favorite pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('show paragraph element, when dont have favorites pokemons', () => {
    const mockPokemons = [];
    renderWithRouter(<FavoritePokemons pokemons={ mockPokemons } />);
    const noFavoritePokemons = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('show favorite pokemons', () => {
    const mockPokemons = [pokemons[1], pokemons[3]];
    renderWithRouter(<FavoritePokemons pokemons={ mockPokemons } />);
    const name = screen.getAllByTestId('pokemon-name');
    const type = screen.getAllByTestId('pokemonType');
    const weight = screen.getAllByTestId('pokemon-weight');
    const img = screen.getAllByRole('img', { name: /sprite/ });
    const imgFavorite = screen.getAllByRole('img', { name: /is marked as favorite/ });

    expect([name[0].innerHTML, name[1].innerHTML]).toEqual(['Charmander', 'Ekans']);
    expect([type[0].innerHTML, type[1].innerHTML]).toEqual(['Fire', 'Poison']);
    expect([weight[0].innerHTML, weight[1].innerHTML])
      .toEqual(['Average weight: 8.5 kg', 'Average weight: 6.9 kg']);
    expect(img[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png');
    expect(imgFavorite[0]).toHaveAttribute('alt', 'Charmander is marked as favorite');
    expect(imgFavorite[1]).toHaveAttribute('alt', 'Ekans is marked as favorite');
  });

  it('dont show favorite pokemons, when dont have favorites', () => {
    const mockPokemons = [];
    renderWithRouter(<FavoritePokemons pokemons={ mockPokemons } />);
    const name = screen.queryAllByTestId('pokemon-name');
    const type = screen.queryAllByTestId('pokemonType');
    const weight = screen.queryAllByTestId('pokemon-weight');
    const img = screen.queryAllByRole('img', { name: /sprite/ });
    const imgFavorite = screen.queryAllByRole('img', { name: /is marked as favorite/ });

    expect(name).toEqual([]);
    expect(type).toEqual([]);
    expect(weight).toEqual([]);
    expect(img).toEqual([]);
    expect(imgFavorite).toEqual([]);
  });
});
