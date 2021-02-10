import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemon = [
      {
        id: 10,
        name: 'Caterpie',
        type: 'Bug',
        averageWeight: {
          value: '2.9',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      }];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const pokeName = getByText('Caterpie');
    const pokeType = getByText('Bug');
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const pokemon = [
      {
        id: 10,
        name: 'Caterpie',
        type: 'Bug',
        averageWeight: {
          value: '2.9',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      }];
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const pokename = queryByText('Pikachu');
    expect(pokename).not.toBeInTheDocument();
  });
});
