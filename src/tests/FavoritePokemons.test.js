import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente "FavoritePokemons.js"', () => {
  test('Testa se exibe mensagem na tela', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  test('Testa se exibe pokemons favoritados', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const favorit = getByText(/Pokémon favoritado?/i);
    fireEvent.click(favorit);
    const favPage = getByText(/Favorite Pokémons/i);
    fireEvent.click(favPage);
    const imgs = getAllByRole('img');
    expect(imgs).toHaveLength(2);
  });
});
