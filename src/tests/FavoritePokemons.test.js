import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa componente <FavoritePokemons />', () => {
  it('Testa se o texto inicial aparece corretamente', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const textOnScreen = getByText(/No favorite pokemon found/i);
    expect(textOnScreen).toBeInTheDocument();
  });

  it('Testa se pokemons favoritos renderizam corretamente', () => {
    const favPokemons = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    }];

    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favPokemons } />);

    const pokemonName = getByText('Pikachu');
    const pokemonType = getByText('Electric');
    const pokemonAvgWgt = getByText(/6.0 kg/i);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonAvgWgt).toBeInTheDocument();
  });
});
