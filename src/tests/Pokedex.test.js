import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa titulo pokemon encontrado', () => {
  renderWithRouter(<App />);
  const h2 = screen.getByRole(
    'heading',
    {
      Level: 2,
      name: 'Encountered pokémons',
    },
  );
  expect(h2).toBeInTheDocument();
});

test('Testa botão proximo pokemon', () => {
  renderWithRouter(<App />);
  const botao = screen.getByRole(
    'button',
    {
      name: 'Próximo pokémon',
    },
  );
  expect(botao).toBeInTheDocument();
});

test('Testa click next', async () => {
  renderWithRouter(<App />);

  const botao = screen.getByRole(
    'button',
    {
      name: 'Próximo pokémon',
    },
  );

  userEvent.click(botao);

  const Charmander = screen.getByText(/Charmander/i);

  expect(Charmander).toBeInTheDocument();

  userEvent.click(botao);

  const Caterpie = screen.getByText(/Caterpie/i);

  expect(Caterpie).toBeInTheDocument();
});
/*
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
 */
