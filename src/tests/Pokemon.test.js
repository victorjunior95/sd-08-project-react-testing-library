import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testing component Pokemon', () => {
  it('Test: render pokémon card', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByAltText(/Pikachu sprite/i);

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Test: link for more details', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText('More details');

    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('Test: favorite icon', () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);
    const { getByAltText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    fireEvent.click(getByLabelText(/Pokémon favoritado?/i));
    const starIcon = getByAltText(/Pikachu is marked as favorite/i);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
