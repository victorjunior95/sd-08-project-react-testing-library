import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

const proximoPoke = 'Próximo pokémon';
const pokeName = 'pokemon-name';

test('Verificando botão de próximo', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  expect(getByText(proximoPoke)).toBeInTheDocument();
  expect(getByText(proximoPoke)).toHaveTextContent(proximoPoke);
  pokemons.forEach((e) => {
    const nomePoke = getByTestId(pokeName);
    expect(nomePoke).toHaveTextContent(e.name);
    fireEvent.click(getByText(proximoPoke));
  });
  expect(getByTestId(pokeName)).toHaveTextContent('Pikachu');
});

test('Verificando pokemons', () => {
  const { queryAllByTestId } = renderWithRouter(<App />);
  expect(queryAllByTestId(pokeName)).toHaveLength(1);
});

test('Verificando filtros', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);

  const categoria = getAllByTestId('pokemon-type-button')[0];
  expect(categoria).toBeInTheDocument();
  expect(categoria).toHaveTextContent('Electric');

  const achados = getByText('Encountered pokémons');
  expect(achados).toBeInTheDocument();
  expect(achados).toHaveTextContent('Encountered pokémons');
});

test('Verificando botão de reset', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const botoes = getByText('Fire');
  const botoesP = getByText('All');
  const nomePoke = getByTestId(pokeName);
  expect(botoesP).toBeInTheDocument();
  fireEvent.click(botoes);
  expect(nomePoke).toHaveTextContent('Charmander');
  fireEvent.click(botoesP);
  pokemons.forEach((e) => {
    expect(nomePoke).toHaveTextContent(e.name);
    fireEvent.click(getByText(proximoPoke));
  });
});
