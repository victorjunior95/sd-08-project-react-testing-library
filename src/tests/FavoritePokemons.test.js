import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const memoryRouter = () => {
  render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
};

// Será avaliado se o arquivo teste FavoritePokemons.test.js contemplam 100% dos casos de uso criados pelo Stryker.
describe('FavoritePokemons.js - is displayed on the screen:', () => {
  // Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.
  test(`The message No favorite pokemon found,
  if the person does not have favorite pokémons`, () => {
    memoryRouter();

    const notFoundFavorite = screen.getByRole('heading', {
      name: /favorite pokémons/i,
    });
    expect(notFoundFavorite).toBeInTheDocument();
  });

  // Teste se é exibido todos os cards de pokémons favoritados.
  test('All favorite Pokémon cards', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink);

    const moreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetails);

    const favoriteButton = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoriteButton);

    const favoritesLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoritesLink);
    const text = screen.getByText(/pikachu/i);
    expect(text).toBeInTheDocument();
  });

  // Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.
  test('No pokemon card is displayed, if it is not favored', () => {
    memoryRouter();
    const notFoundFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(notFoundFavorite).toBeInTheDocument();
  });
});
