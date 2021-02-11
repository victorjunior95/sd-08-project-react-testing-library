import React from 'react';
import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
// import { RuleTester } from 'eslint';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa se não há favorito', () => {
  renderWithRouter(<FavoritePokemons />);
  const fav = screen.getByText(
    /No favorite pokemon found/i,
  );
  expect(fav).toBeInTheDocument();
});

test('Testa se existe favorito', async () => {
  renderWithRouter(<App />);

  const linkAll = screen.getByText(/All/i);

  expect(linkAll).toBeInTheDocument();

  userEvent.click(linkAll);

  const pikachu = screen.getByText(/Pikachu/i);

  expect(pikachu).toBeInTheDocument();

  expect(screen.getByText(/More details/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/More details/i));

  userEvent.click(screen.getByText(/Pokémon favoritado?/i));

  userEvent.click(screen.getByText(/Favorite Pokémons/i));

  expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();

  expect(screen.getByText(/Electric/i)).toBeInTheDocument();
});

test('exibe nenhum favorito', async () => {
  renderWithRouter(<App />);

  const linkAll = screen.getByText(/All/i);

  expect(linkAll).toBeInTheDocument();

  userEvent.click(linkAll);

  const pikachu = screen.getByText(/Pikachu/i);

  expect(pikachu).toBeInTheDocument();

  expect(screen.getByText(/More details/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/More details/i));

  userEvent.click(screen.getByText(/Pokémon favoritado?/i));

  userEvent.click(screen.getByText(/Favorite Pokémons/i));

  const el = screen.getByText(/No favorite pokemon found/i);

  expect(el).toBeInTheDocument();
});
