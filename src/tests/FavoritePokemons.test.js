import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = render(<FavoritePokemons pokemons={ [] } />);
  const notFoundText = getByText('No favorite pokemon found');
  expect(notFoundText).toBeInTheDocument();
});

test('este se é exibido todos os cards de pokémons favoritados', () => {
  const { getByRole, getByLabelText, getByText } = renderWithRouter(<App />);
  const detailsButton = getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(detailsButton);
  const checkButton = getByLabelText('Pokémon favoritado?');
  userEvent.click(checkButton);
  const favButton = getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(favButton);
  const pokemon = getByText('Pikachu');
  expect(pokemon).toBeInTheDocument();
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  const { getByRole, getByLabelText, queryByText } = renderWithRouter(<App />);
  const detailsButton = getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(detailsButton);
  const checkButton = getByLabelText('Pokémon favoritado?');
  userEvent.click(checkButton);
  const favButton = getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(favButton);
  const pokemon = queryByText('Ekans');
  expect(pokemon).toBeNull();
});
