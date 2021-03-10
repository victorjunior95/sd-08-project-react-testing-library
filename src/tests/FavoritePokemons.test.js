import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonsWillFavorite = [
  {
    id: 25,
    name: 'Pikachu',
  },
  {
    id: 4,
    name: 'Charmander',
  },
];
test('Verifica mensagem "No favorite pokemon found"', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkFavoritoso = getByText('Favorite Pokémons');

  fireEvent.click(linkFavoritoso);

  const Nofavorite = getByText('No favorite pokemon found');

  expect(Nofavorite).toBeInTheDocument();
});

test('Verifica os cards favoritados', () => {
  const { getByText, history, getAllByText } = renderWithRouter(<App />);

  history.push('/pokemons/25');
  const favoritede = getByText('Pokémon favoritado?');

  fireEvent.click(favoritede);

  history.push('/pokemons/4');
  const favoriteded = getByText('Pokémon favoritado?');

  fireEvent.click(favoriteded);

  const linkFavorite = getByText('Favorite Pokémons');

  fireEvent.click(linkFavorite);

  const pikachu = getByText('Pikachu');
  const charmander = getByText('Charmander');
  const favoritedLength = getAllByText('More details');

  expect(pikachu).toBeInTheDocument();
  expect(charmander).toBeInTheDocument();
  expect(favoritedLength.length).toBe(pokemonsWillFavorite.length);
});

test('Verifica se existe o pokemon não favoritado', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavorite = getByText('Favorite Pokémons');

  fireEvent.click(linkFavorite);

  const noFavorite = getByText('Pikachu');
  history.push('/pokemons/25');
  const favorited = getByText('Pokémon favoritado?');
  fireEvent.click(favorited);

  expect(noFavorite).not.toBeInTheDocument();
});
