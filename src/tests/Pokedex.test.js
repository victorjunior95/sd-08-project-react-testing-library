import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

it('Teste se página contém um heading h2 com o texto Encountered pokémons', async () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2Poke = getByRole('heading', {
    name: /encountered pokémons/i,
  });
  expect(h2Poke).toBeInTheDocument();
});

it('Teste se é exibido o próximo Pokémon da'
+ 'lista quando o botão Próximo pokémon é clicado.', async () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const firstPoke = getByText(/pikachu/i);
  expect(firstPoke).toBeInTheDocument();
  const button = getByRole('button', {
    name: /Próximo pokémon/i,
  });
  userEvent.click(button);
  const secondPoke = getByText(/charmander/i);
  expect(secondPoke).toBeInTheDocument();
});

it('Teste se é mostrado apenas um Pokémon por vez.', async () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const firstPoke = getAllByTestId('pokemon-name');
  expect(firstPoke.length).toBe(1);
});
