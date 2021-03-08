import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('É renderizado um card com as informações de determinado pokémon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    let name = getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
    const next = getByText(/Próximo pokémon/i);
    userEvent.click(next);
    name = getByText(/Charmander/i);
    expect(name).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    let name = getByText(/Pikachu/i);
    let gender = screen.getByTestId('pokemonType');
    expect(name).toBeInTheDocument();
    expect(gender).toHaveTextContent('Electric');
    const next = getByText(/Próximo pokémon/i);
    userEvent.click(next);
    name = getByText(/Charmander/i);
    gender = screen.getByTestId('pokemonType');
    expect(name).toBeInTheDocument();
    expect(gender).toHaveTextContent('Fire');
  });

  test('O peso médio do pokémon deve ser exibido com um texto...', () => {
    const { getByText } = renderWithRouter(<App />);
    const weight = screen.getByTestId('pokemon-weight');
    const measurement = getByText(/kg/i);
    expect(weight).toBeInTheDocument();
    expect(measurement).toBeInTheDocument();
  });

  test('O card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });
});
