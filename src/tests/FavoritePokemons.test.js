import React from 'react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

import pokemons from '../data';

describe('testes do FavoritePokemons', () => {
  it('teste1: mensagem de No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('teste2: mostra pokemons favoritados', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => pokemons[0].id,
    }));

    const { findByText } = renderWithRouter(<FavoritePokemons />);
    await findByText(/Pikachu/i);
  });
});
