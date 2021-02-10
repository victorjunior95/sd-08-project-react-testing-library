import React from 'react';
// import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Requisito 3 <FavoritePokemons />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons pokemon={ [] } />);
      const text = getByText(/No favorite pokemon found/i);
      expect(text).toBeInTheDocument();
    });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getAllByText } = renderWithRouter(<FavoritePokemons
      pokemons={ pokemons }
    />);
    const charmander = getByText(/Charmander/i);
    const fire = getAllByText(/Fire/i);
    expect(charmander).toBeInTheDocument();
    expect(fire).toHaveLength(2);
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.',
    () => {
      const { container } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
      const card = container.querySelector('.favorite-pokemons');
      expect(card).toBeFalsy();
    });
});
