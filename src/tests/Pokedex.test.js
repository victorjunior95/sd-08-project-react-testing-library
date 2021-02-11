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
  const btao = screen.getByRole(
    'button',
    {
      name: /Próximo pokémon/i,
    },
  );
  expect(btao).toBeInTheDocument();
});

test('Testa click next', async () => {
  renderWithRouter(<App />);

  const btnnext = screen.getByRole(
    'button',
    {
      name: 'Próximo pokémon',
    },
  );

  userEvent.click(btnnext);

  const Charmander = screen.getByText(/Charmander/i);

  expect(Charmander).toBeInTheDocument();

  userEvent.click(btnnext);

  const Caterpie = screen.getByText(/Caterpie/i);

  expect(Caterpie).toBeInTheDocument();
});

test('Teste escolha do tipo', async () => {
  renderWithRouter(<App />);

  const btnfire = screen.getByRole(
    'button',
    {
      name: 'Fire',
    },
  );
  userEvent.click(btnfire);
  const tipofire = screen.getByText('Charmander');

  expect(tipofire).toBeInTheDocument();

  const btnext = screen.getByRole(
    'button',
    {
      name: 'Próximo pokémon',
    },
  );

  userEvent.click(btnext);
  const tipofire2 = screen.getByText('Rapidash');

  expect(tipofire2).toBeInTheDocument();
});

test('Teste todos os tipos', async () => {
  renderWithRouter(<App />);

  const all = screen.getByRole(
    'button',
    {
      name: 'All',
    },
  );
  userEvent.click(all);
  const tipoall = screen.getByText('Pikachu');

  expect(tipoall).toBeInTheDocument();
});

test('Teste selecionando pelo id', async () => {
  renderWithRouter(<App />);

  const dtsId = screen.getAllByTestId('pokemon-type-button');
  const lgth = 7;
  expect(dtsId.length).toBe(lgth);
});
