import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Pokedex component should render <h2>Encountered pokémons</h2>', () => {
  const { getByRole } = renderWithRouter(<App />);
  const headingH2 = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(headingH2).toBeInTheDocument();
});

test('The next Pokémon should be shown when "Próximo Pokémon" is clicked', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const firstPokemon = getByText(/pikachu/i);
  expect(firstPokemon).toBeInTheDocument();

  const btnNext = getByRole('button', {
    name: /próximo pokémon/i,
  });
  fireEvent.click(btnNext);

  const secondPokemon = getByText(/charmander/i);
  expect(secondPokemon).toBeInTheDocument();
});

test('', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const firstPokemon = getAllByTestId('pokemon-name');
  expect(firstPokemon.length).toBe(1);
});

// mostrar primeiro pokemon se estiver no último da lista
// botões de filtro
// botão reset
// botões dinâmicos
