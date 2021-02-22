import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Test', () => {
  it(`Teste se é exibido na tela a mensagem
    'No favorite pokemon found', se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavPokemon = screen.getByText(/No favorite pokemon found/i);

    expect(noFavPokemon).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByText(/More details/i);
    userEvent.click(pokemonDetails);

    const favPokemon = screen.getByRole('checkbox');
    userEvent.click(favPokemon);

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);

    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);
    const nextPokeDetails = screen.getByText(/More details/i);
    userEvent.click(nextPokeDetails);

    const nextFavPokemon = screen.getByRole('checkbox');
    userEvent.click(nextFavPokemon);

    const favoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoritePokemons);

    const allFavPokemons = screen.getAllByTestId('pokemon-name').length;
    expect(allFavPokemons).toBe(2);
  });
});
