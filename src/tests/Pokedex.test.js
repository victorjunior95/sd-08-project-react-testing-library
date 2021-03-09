import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente `<Pokedex.js', () => {
  const namebtn = 'Próximo pokémon';
  test('se página contém um heading `h2` com o texto `Encountered pokémons`.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const selectHeading = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(selectHeading).toBeInTheDocument();
  });
  test('se o botão `Próximo pokémon` é clicado.', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnPokemon = getByText(namebtn);
    pokemons.forEach((current) => {
      expect(getByText(current.name)).toBeInTheDocument();
      fireEvent.click(btnPokemon);
    });
  });
  test('se o botão deve contem o texto `Próximo pokémon`;', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnPokemon = getByText(namebtn);
    expect(btnPokemon).toBeInTheDocument();
  });
  test('Se os Pokémons são mostrados um a um, ao clicar sucessivamente no botão', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const btnPokemon = getByText(namebtn);
    pokemons.forEach((current) => {
      expect(getByText(current.name)).toBeInTheDocument();
      fireEvent.click(btnPokemon);
      const numberPokemons = getAllByTestId('pokemon-name');
      expect(numberPokemons.length).toBe(1);
    });
  });
  test('Se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });
});
describe('Teste se a Pokédex tem os botões de filtro.', () => {
  test('Se selecionado de um botão de tipo, mostrar só pokemom do mesmo tipo', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const pokemonsFilterBtn = getAllByTestId('pokemon-type-button');
    pokemonsFilterBtn.forEach((typeBtn) => {
      const pokemonType = typeBtn.textContent;
      const btnNextPokemon = getByTestId('next-pokemon');
      userEvent.click(typeBtn);
      expect(getByTestId('pokemonType').textContent).toBe(pokemonType);
      userEvent.click(btnNextPokemon);
    });
  });
});
describe('Se a Pokédex contém um botão para resetar o filtro', () => {
  test('Se o texto do botão deve ser `All`', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnText = getByText('All');
    expect(btnText).toBeInTheDocument();
  });
  test('Se é criado, dinamicamente, um btn de filtro para cada tipo de Pokémon.', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnText = getByText('All');
    fireEvent.click(btnText);
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
  });
});
