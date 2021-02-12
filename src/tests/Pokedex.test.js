import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Requisito 4 - pagina Pokedex', () => {
  it('verifica se heading existe heading', () => {
    const { getByText } = renderWithRouter(<App />);
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('verifica botao de proximo pokemon', () => {
    const { getByTestId, getByText, getAllByTestId } = renderWithRouter(<App />);
    const actualPokemon = getByTestId('pokemon-name');
    expect(actualPokemon).toHaveTextContent(pokemons[0].name);

    const nextPokemon = getByText('Próximo pokémon');
    const typePokemon = getAllByTestId('pokemon-type-button');
    for (let i = 0; i < pokemons.length; i += 1) {
      expect(typePokemon.some((type) => type.innerHTML === pokemons[i].type))
        .toBeTruthy();
      userEvent.click(nextPokemon);
      if (i < (pokemons.length - 1)) {
        const index = i + 1;
        expect(actualPokemon).toHaveTextContent(pokemons[index].name);
      } else {
        expect(actualPokemon).toHaveTextContent(pokemons[0].name);
      }
    }
  });

  it('verifica filtros de pokemons', () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(<App />);

    const actualType = getByTestId('pokemonType');
    expect(actualType.innerHTML).toBe(pokemons[0].type);

    const typePokemon = [getByText('All'), ...getAllByTestId('pokemon-type-button')];
    for (let i = 0; i < typePokemon.length; i += 1) {
      userEvent.click(typePokemon[i]);
      if (typePokemon[i].innerHTML === 'All') {
        expect(actualType).toHaveTextContent(pokemons[0].type);
      } else {
        expect(actualType.innerHTML).toBe(typePokemon[i].innerHTML);
      }
    }
  });
});
