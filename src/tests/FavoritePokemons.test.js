import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes no FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const notFoundMsg = getByText(/No favorite pokemon found/i);
    expect(notFoundMsg).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByText } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();

    fireEvent.click(getByText(/More details/i));
    const inputLabel = getByText(/Pokémon favoritado?/i);
    expect(inputLabel).toBeInTheDocument();

    const inputCheckbox = screen.getByRole('checkbox');
    userEvent.click(inputCheckbox);

    const favoriteLink = getByText(/Favorite Pokémons/i);
    userEvent.click(favoriteLink);

    const favoritePikachu = getByText(/Pikachu/i);
    expect(favoritePikachu).toBeInTheDocument();

    const homeBack = getByText(/Home/i);
    userEvent.click(homeBack);

    const firePokemon = getByText(/Fire/i);
    userEvent.click(firePokemon);

    const charmanderPokemon = getByText(/Charmander/i);
    expect(charmanderPokemon).toBeInTheDocument();

    const moreDetails2 = getByText(/More details/i);
    userEvent.click(moreDetails2);
    const inputCheckbox2 = screen.getByRole('checkbox');
    userEvent.click(inputCheckbox2);

    const favoriteCharmander = getByText(/Favorite Pokémons/i);
    userEvent.click(favoriteCharmander);

    const pikachu = getByText(/Pikachu/i);
    const charmander = getByText(/Charmander/i);
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });
});
