import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import RenderWithRouter from './renderWithRouter';

describe('Testando o componente <FavoritePokemons.js />', () => {
  it('Testando se é exibido a mensagem No favorite pokemon found', () => {
    RenderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const favoriteText = screen.getByText('No favorite pokemon found');

    expect(favoriteText).toBeInTheDocument();
  });

  it('Testando se é exibido todos os cards de pokémons favoritados', () => {
    const pokemon = pokemons[1];
    const { baseElement } = RenderWithRouter(<FavoritePokemons pokemons={ [pokemon] } />);

    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Average weight: 8.5 kg')).toBeInTheDocument();
    expect(screen.getByText('More details')).toBeInTheDocument();

    const imagesNumber = baseElement.querySelectorAll('img').length;
    expect(imagesNumber).toBe(2);
  });
});
