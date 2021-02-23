import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Req 04', () => {
  test('página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Próximo pokémon')).toBeInTheDocument();
  });

  test('Os próximos Pokémons da lista devem ser mostrados', () => {
    const { getByText } = renderWithRouter(<App />);
    const botao = getByText('Próximo pokémon');
    pokemons.forEach((atual) => {
      expect(getByText(atual.name)).toBeInTheDocument();
      userEvent.click(botao);
    });
  });

  test('Mostrar um por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Filtrar', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const filtros = getAllByTestId('pokemon-type-button');

    filtros.forEach((tipo) => {
      const pokemonType = tipo.textContent;
      const btnNextPokemon = getByTestId('next-pokemon');
      userEvent.click(tipo);
      expect(getByTestId('pokemonType').textContent).toBe(pokemonType);
      userEvent.click(btnNextPokemon);
    });
  });

  test('O texto do botão deve ser All', () => {
    const { getByText } = renderWithRouter(<App />);
    const all = getByText('All');
    expect(all).toBeInTheDocument();
  });

  test('Deverá mostrar os Pokémons normalmente quando o botão All for clicado', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnAllPokemons = getByText('All');
    userEvent.click(btnAllPokemons);
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
  });
});
