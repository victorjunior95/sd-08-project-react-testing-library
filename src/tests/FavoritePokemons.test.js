import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes componente FavoritePokemons.js', () => {
  it('No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);

    expect(notFound).toBeInTheDocument();
    expect(notFound).toHaveTextContent('No favorite pokemon found');
  });
});
