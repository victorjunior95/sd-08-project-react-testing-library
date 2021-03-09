import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Pokemon', () => {
  it('show information by the card is correct', () => {
    const { getByTestId, getByAltText, getByText, history } = renderWithRouter(<App />);
    const namePokemon = getByTestId('pokemon-name');
    const typePokemon = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const img = getByAltText('Pikachu sprite');

    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAttribute('src', '');

    const moreDetails = getByText('More details');
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = getByText('Pokémon favoritado?');
    userEvent.click(favorite);
    history.push('/');

    const favIcon = getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
