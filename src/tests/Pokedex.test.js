import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderService from '../services/renderService';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokedex', () => {
  test('Test if the page contains an h2 heading with text Encountered Pokémon.', () => {
    renderService(<App />);
    const headH2 = screen.getByRole('heading',
      {
        Level: 2,
        name: 'Encountered pokémons',
      });
    expect(headH2).toBeInTheDocument();
  });

  test('Test if application of the next Pokémon on the list when Next button is clicked',
    () => {
      renderService(<App />);
      const nextBtn = screen.getByRole('button',
        {
          name: 'Próximo pokémon',
        });
      const buttons = screen.getByText('All');

      userEvent.click(buttons);
      expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();

      pokemons.forEach((pokemon) => {
        const namePokemon = screen.getByText(pokemon.name);
        expect(namePokemon).toBeInTheDocument();
        userEvent.click(nextBtn);
      });
    });

  test('if only one Pokémon is shown at a time.', () => {
    renderService(<App />);
    const onePokemon = screen.getAllByTestId('pokemon-name');
    expect(onePokemon.length).toBe(1);
  });
});
test('if Pokédex has the filter buttons', () => {
  renderService(<App />);
  const typeButton = screen.queryAllByTestId('pokemon-type-button');
  expect(typeButton[0].textContent).toBe('Electric');
});
test('the Next pokémon button must be disabled', () => {
  renderService(<App />);
  const btn = screen.getByRole('button', { name: 'Próximo pokémon',
  });
  const electricButton = screen.getByRole('button', { name: 'Electric' });
  userEvent.click(electricButton);
  expect(btn).toBeDisabled();
});
