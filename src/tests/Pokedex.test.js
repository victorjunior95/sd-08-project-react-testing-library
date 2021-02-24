import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Req V - Testing Pokedex', () => {
  it(' 5.1 - should test if page contains h2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading',
      {
        Level: 2,
        name: 'Encountered pokémons',
      });
    expect(heading).toBeInTheDocument();
  });

  it(' 5.2 - should test if show next pokemon if the button had clicked',
    () => {
      const { getByRole, getByText } = renderWithRouter(<App />);
      const nextButton = getByRole('button',
        {
          name: 'Próximo pokémon',
        });
      const allButton = getByText('All');

      userEvent.click(allButton);
      expect(getByText(/Pikachu/i)).toBeInTheDocument();

      pokemons.forEach((pokemon) => {
        const namePokemon = getByText(pokemon.name);
        expect(namePokemon).toBeInTheDocument();
        userEvent.click(nextButton);
      });
    });

  it(' 5.3 - should test if show one pokemon for turn', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const singlePokemon = getAllByTestId('pokemon-name');
    expect(singlePokemon.length).toBe(1);
  });
  it('5.4 - should test if Pokédex had filter buttons', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const typeButton = queryAllByTestId('pokemon-type-button');
    expect(typeButton[0].textContent).toBe('Electric');
  });
  it('5.5 - should test if button is disable if one pokemon showed', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btn = getByRole('button', { name: 'Próximo pokémon',
    });
    const electricButton = getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    expect(btn).toBeDisabled();
  });
});
