import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Requisito 6 - Pokemon', () => {
  it('verifica info do pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const { value, measurementUnit } = pokemons[0].averageWeight;

    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
    const weigthText = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonWeight).toHaveTextContent(weigthText);
  });

  it('verifica detalhes do pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokeonDetails = getByText('More details');
    expect(pokeonDetails.href).toMatch(`/pokemons/${pokemons[0].id}`);
    userEvent.click(pokeonDetails);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  it('verifica imagem do pokemon', () => {
    const { getByAltText } = renderWithRouter(<App />);
    expect(getByAltText(`${pokemons[0].name} sprite`).src).toBe(pokemons[0].image);
  });

  it('verifica pokemon favorito', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    userEvent.click(getByText('More details'));
    userEvent.click(getByLabelText('Pokémon favoritado?'));
    const favorite = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favorite.src).toMatch('/star-icon.svg');
  });
});
