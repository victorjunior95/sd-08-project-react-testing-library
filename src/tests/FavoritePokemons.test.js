import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente "FAvoritePokemons"', () => {
  test('é exibido a mensagem "no favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('é exibido todos os cards de pokémons favoritados', () => {
    const pokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Eletric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
    ];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const name = getByText('Pikachu');
    const type = getByText('Eletric');
    const averageWeight = getByText(/6.0 kg/i);
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
  });
});
