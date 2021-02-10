import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

describe('Tests "Pokemon" component', () => {
  it('renders the correct data', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokeName = getByTestId('pokemon-name');
    const pokeType = getByTestId('pokemonType');
    const pokeWeight = getByTestId('pokemon-weight');
    const { value, measurementUnit } = pokemons[0].averageWeight;

    expect(pokeName).toHaveTextContent(pokemons[0].name);
    expect(pokeType).toHaveTextContent(pokemons[0].type);
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('tests link to details page', () => {
    const { getByText } = renderWithRouter(<App />);

    const details = getByText('More details');
    expect(details.href).toMatch(`/pokemons/${pokemons[0].id}`);
    fireEvent.click(details);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  it('tests pokemon image', () => {
    const { getByAltText } = renderWithRouter(<App />);

    expect(getByAltText(`${pokemons[0].name} sprite`).src).toBe(pokemons[0].image);
  });

  it('tests favorite star', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByLabelText('Pokémon favoritado?'));

    const favorite = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favorite.src).toMatch('/star-icon.svg');
  });
});
