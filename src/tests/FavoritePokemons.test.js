import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('FavoritePokemons.js', () => {
  test('if contain the message with no pokemon marked as favorite', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemons = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  test('if contain the cards of favorite pokemons', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favoritePikachu = screen.getByLabelText(/Pokémon favoritado\?/i);
    userEvent.click(favoritePikachu);

    history.push('/pokemons/151');
    const favoriteMew = screen.getByLabelText(/Pokémon favoritado\?/i);
    userEvent.click(favoriteMew);

    history.push('/favorites');

    const favoriteCardPikachu = screen.getByText(/Pikachu/i);
    expect(favoriteCardPikachu).toBeInTheDocument();
    const favoriteCardMew = screen.getByText(/Mew/i);
    expect(favoriteCardMew).toBeInTheDocument();
  });
});
