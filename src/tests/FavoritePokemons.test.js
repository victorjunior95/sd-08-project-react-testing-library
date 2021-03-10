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
  const linkFavoritos = getByText('Favorite Pokémons');

  fireEvent.click(linkFavoritos);

  const Nofavorite = getByText('No favorite pokemon found');

  expect(Nofavorite).toBeInTheDocument();
});

test('Verifica os cards favoritados', () => {
  const { getByText, history, getAllByText } = renderWithRouter(<App />);
  pokemonsWillFavorite.map((element) => { history.push(`/pokemons/${element.id}`);
    const favorited = getByText('Pokémon favoritado?');

    fireEvent.click(favorited);
  });

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
