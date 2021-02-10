import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const notFavorite = getByText(/no favorite pokemon found/i);
  expect(notFavorite).toBeInTheDocument();
});

test('é exibido todos os cards de pokémons favoritados', () => {
  const pokemons = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    },
  ];
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  const pokemonName = getByText(/Pikachu/i);
  const pokemonType = getByText(/Electric/i);
  const pokemonAverageW = getByText(/6.0 kg/i);
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonAverageW).toBeInTheDocument();
});

test('nenhum card de pokémon é exibido, se não estiver favoritado.', () => {
  const { container } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const favoritePokemon = container.querySelector('favorite-pokemons');
  expect(favoritePokemon).toBeNull();
});
