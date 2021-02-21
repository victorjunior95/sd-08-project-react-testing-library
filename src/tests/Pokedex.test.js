import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do componente Pokedex', () => {
  test('verifica se existe um h2 com o texto "Encountered Pokemons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encounteredHeading = getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(encounteredHeading).toBeInTheDocument();
  });
  test('verifica se o botao de proximo pokemon funciona corretamente', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });
  test('verifica quantidade de botoes na pokedex', () => {
    const { getAllByRole, getAllByTestId } = renderWithRouter(<App />);
    const allButtons = getAllByRole('button');
    const NINE = 9;
    const SEVEN = 7;
    expect(allButtons.length).toBe(NINE);
    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(SEVEN);
    expect(allButtons[0]).toHaveTextContent(/all/i);
  });
  test('verifica se os botoes possuem o texto correto', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const allButtons = getAllByRole('button');
    expect(allButtons[0]).toHaveTextContent(/all/i);
    expect(allButtons[1]).toHaveTextContent(/electric/i);
    expect(allButtons[2]).toHaveTextContent(/fire/i);
    expect(allButtons[3]).toHaveTextContent(/bug/i);
    expect(allButtons[4]).toHaveTextContent(/poison/i);
    expect(allButtons[5]).toHaveTextContent(/psychic/i);
    expect(allButtons[6]).toHaveTextContent(/normal/i);
    expect(allButtons[7]).toHaveTextContent(/dragon/i);
    expect(allButtons[8]).toHaveTextContent(/próximo pokémon/i);
  });
  test('verifica se o botao de proximo pokemon funciona', () => {
    const { getAllByRole, getByText } = renderWithRouter(<App />);
    const allButtons = getAllByRole('button');
    userEvent.click(allButtons[0]);
    userEvent.click(allButtons[8]);
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });
});
