import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const FavPok = 'Favorite Pokémons';
const FavPath = '/favorites';
const Details = 'More details';

// Tirei inspiração do repositorio da Viviane Florido neste requisito, para
// ter uma idéia de como começar.

test('Testando se a mensagem <No favorite pokemon found> aparece na tela', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText(FavPok);

  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe(FavPath);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText, history } = renderWithRouter(<App />);

  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(getByText(Details));
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  fireEvent.click(getByText('Pokémon favoritado?'));

  fireEvent.click(getByText(FavPok));
  const { pathname } = history.location;
  expect(pathname).toBe(FavPath);
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('Teste se *nenhum* card de pokémon é exibido, se ele não estiver favoritado', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const char = 'Charmander';

  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(getByText(Details));
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  fireEvent.click(getByText('Pokémon favoritado?'));

  fireEvent.click(getByText('Home'));
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText(char)).toBeInTheDocument();
  fireEvent.click(getByText(Details));
  expect(getByText('Charmander Details')).toBeInTheDocument();

  fireEvent.click(getByText(FavPok));
  const { pathname } = history.location;
  expect(pathname).toBe(FavPath);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
