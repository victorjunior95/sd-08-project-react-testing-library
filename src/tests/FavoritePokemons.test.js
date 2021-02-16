import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testando Favorite Pokemon', () => {
  test('Renderiza No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ [
      ] }
    />);
    const textFavorite = getByText('No favorite pokemon found');
    expect(textFavorite).toBeInTheDocument();
  });

  test('Renderiza pokemon favorite ', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ [
        {
          id: 25,
          name: 'Pikachu',
          type: 'Electric',
          averageWeight: {
            value: '6.0',
            measurementUnit: 'kg',
          },
          image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' },

      ] }
    />);
    const textFavorite = getByText('Pikachu');
    expect(textFavorite).toBeInTheDocument();
  });

  test('Renderiza segundo pokemon favorite ', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons
      pokemons={ [
        {
          id: 25,
          name: 'Pikachu',
          type: 'Electric',
          averageWeight: {
            value: '6.0',
            measurementUnit: 'kg',
          },
          image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' },

      ] }
    />);
    const textFavorite = queryByText('Charmander');
    expect(textFavorite).not.toBeInTheDocument();
  });
});
