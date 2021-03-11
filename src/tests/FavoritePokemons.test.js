import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from '../components/renderWithRouter';

// Será avaliado se o arquivo teste FavoritePokemons.test.js contemplam 100% dos casos de uso criados pelo Stryker.
describe('FavoritePokemons.js - is displayed on the screen:', () => {
  // Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.
  test(`the message No favorite pokemon found,
  if the person does not have favorite pokémons`, () => {
    const { getByText } = render(<FavoritePokemons pokemons={ [] } />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  // Teste se é exibido todos os cards de pokémons favoritados.
  test('all favorite Pokémon cards', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });

  // Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.
  test('no pokemon card is displayed, if it is not favored', () => {
    const { getAllByTestId } = render(<FavoritePokemons pokemons={ [] } />);
    expect(getAllByTestId('pokemon-name').length).toBe(0);
  });
});
