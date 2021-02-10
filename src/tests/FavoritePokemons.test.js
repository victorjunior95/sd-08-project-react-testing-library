import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 3 - FavoritePokemons.test', () => {
  test('Sem pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    const notFoundPokemon = screen.getByText(/no favorite pokemon found/i);
    expect(notFoundPokemon).toBeInTheDocument();

    const notFavotiteCard = document
      .querySelector('.favorite-pokemons');
    expect(notFavotiteCard).toBe(null);
  });

  test('Com pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favoritePikachu = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePikachu);

    history.push('/pokemons/4');
    const favoriteCharmander = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCharmander);

    history.push('/favorites');
    const showFavoriteCards = document
      .querySelector('.favorite-pokemons').childElementCount;
    expect(showFavoriteCards).toBe(2);
  });
});
