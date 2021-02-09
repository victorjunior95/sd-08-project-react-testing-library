import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from './mock/pokemon';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('se é exibido mensagem No favorite pokemon found, não tendo favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ data } />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Electric')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
  });

  test('se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { container } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const pokemon = container.querySelector('.favorite-pokemons');
    expect(pokemon).toBeNull();
  });
});
