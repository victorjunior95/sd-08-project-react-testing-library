import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
// import App from '../App';

describe('teste do componente FavoritePokemons', () => {
  test('verifica se o cabeçalho e texto aparecem caso de nenhum favorito', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemons />);
    const favoriteHeader = getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(favoriteHeader).toBeInTheDocument();
    const notFoundParagraph = document.querySelector('p');
    expect(notFoundParagraph).toHaveTextContent(/no favorite pokemon found/i);
  });
  // test('verifica se ao favoritar pokemons, ele renderiza na tela', () => {
  //   const { getByRole, history } = renderWithRouter(<App />);
  //   const moreDetails = getByRole('link', {
  //     name: /more details/i,
  //   });
  //   userEvent.click(moreDetails);
  //   const favoriteCheckbox = getByRole('checkbox', {
  //     name: /pokémon favoritado\?/i,
  //   });
  //   userEvent.click(favoriteCheckbox);
  //   history.push('/favorites');
  //   const pikachuHeading = getByRole('heading', {
  //     level: 2,
  //     name: /pikachu details/i,
  //   });
  //   expect(pikachuHeading).toBeInTheDocument();
  //   const pokemonName = getByTestId('pokemon-name');
  //   expect(pokemonName).toHaveTextContent(/pikachu/i);
  // });
});
