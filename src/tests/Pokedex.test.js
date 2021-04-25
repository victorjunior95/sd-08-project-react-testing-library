import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testes do requisito 5', () => {
  it('Verifica heading Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('Verifica texto e cliques botao Proximo pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const nextButton = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokeName = getByText(pokemon.name);
      expect(pokeName).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
  it('Verifica se é mostrado apenas um Pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const headingPokemon = getAllByTestId('pokemon-name');
    expect(headingPokemon.length).toBe(1);
  });
  it('Verifica se tem botão de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonFilter = getAllByTestId('pokemon-type-button');
    expect(buttonFilter[0]).toHaveTextContent('Electric');
    expect(buttonFilter[3]).toHaveTextContent('Poison');
    expect(buttonFilter[6]).toHaveTextContent('Dragon');
  });
  it('Verifica se botão de Próximo deve ser desabilitado', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    const electricButton = getByRole('button', { name: 'Electric' });
    fireEvent.click(electricButton);
    expect(nextButton).toBeDisabled();
  });
});
