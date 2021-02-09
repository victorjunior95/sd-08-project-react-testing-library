import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const favPokemons = pokemons.slice(0, 2);

describe('Requisito 3', () => {
  it('O texto "No favorite pokemon found" é exibido se não houver favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Pokemons favorito são exibidos no componente.', () => {
    const { getByAltText, queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favPokemons } />,
    );
    expect(queryByText('No favorite pokemon found')).toBeNull();
    favPokemons.forEach(({ name }) => {
      const img = getByAltText(`${name} sprite`);
      expect(img).toBeInTheDocument();
    });
  });
});
