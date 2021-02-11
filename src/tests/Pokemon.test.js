import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa pokemon encontrado por nome', () => {
  renderWithRouter(<App />);
  const idname = screen.getByTestId('pokemon-name');
  // console.log(idname.textContent);
  expect(idname.textContent).toBe('Pikachu');
});

test('Testa pokemon encontrado por tipo', () => {
  renderWithRouter(<App />);
  const idtipo = screen.getByTestId('pokemonType');
  // console.log(idtipo.textContent);
  expect(idtipo.textContent).toBe('Electric');
});

test('Testa pokemon encontrado por peso', () => {
  renderWithRouter(<App />);
  const idpeso = screen.getByTestId('pokemon-weight');
  // console.log(idpeso.textContent);
  // expect(idpeso).toBe();
  expect(idpeso.textContent).toBe('Average weight: 6.0 kg');
});

/*
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
}); */
