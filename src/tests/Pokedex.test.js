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
  });
});
