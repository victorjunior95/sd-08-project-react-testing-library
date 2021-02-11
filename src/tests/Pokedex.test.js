import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const SETE = 7;

describe('Testa o componente Pokedex', () => {
  test('Testa se há um h2 no componente', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const heading = getByText('Encountered pokémons');
    const headingByRole = getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
    expect(headingByRole).toBeInTheDocument();
  });

  test('Testa se o próximo pokemon aparece ao clicar no botão de pŕoximo pokemon', () => {
    const pokemons = ['Charmander',
      'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash',
      'Snorlax', 'Dragonair', 'Pikachu'];
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();

    pokemons.forEach((pok) => {
      fireEvent.click(button);
      const pokemon = getByText(pok);
      expect(pokemon).toBeInTheDocument();
    });
  });

  test('Testa se há mais de um pokemon na tela por vez', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const img = getAllByRole('img');
    expect(img).toHaveLength(1);
  });

  test('Testa se os botões aparecem na tela e filtram a pokedex', () => {
    const { getAllByTestId, getByRole, getByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(SETE);

    const testType = (type) => {
      const buttonType = getByRole('button', { name: type });
      fireEvent.click(buttonType);
      const pokemonType = getByTestId('pokemonType');
      expect(pokemonType).toHaveTextContent(type);
      if (type === 'Fire' || type === 'Psychic') {
        const firstPoke = getByTestId('pokemon-name');
        const buttonNext = getByTestId('next-pokemon');
        fireEvent.click(buttonNext);
        const secondPoke = getByTestId('pokemon-name');
        expect(firstPoke).not.toHaveTextContent(secondPoke);
      }
    };
    testType('Electric');
    testType('Fire');
    testType('Psychic');
  });

  test('Testa botão de resetar filtro', () => {
    const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toHaveTextContent('All');

    const allButton = getByRole('button', { name: 'All' });
    fireEvent.click(allButton);
    const nextButton = getByTestId('next-pokemon');
    const dataPokemons = ['Charmander',
      'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash',
      'Snorlax', 'Dragonair', 'Pikachu'];

    dataPokemons.forEach((pok) => {
      fireEvent.click(nextButton);
      const pokemon = getByText(pok);
      expect(pokemon).toBeInTheDocument();
    });
  });
});
