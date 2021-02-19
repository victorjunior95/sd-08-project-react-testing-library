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
});
