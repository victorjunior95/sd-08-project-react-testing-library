import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Pokemon', () => {
  it('information shown by the card is correct', () => {
    const { getByTestId, getByAltText, getByText, history } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const image = getByAltText('Pikachu sprite');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(image).toBeInTheDocument();
    expect(image).not.toHaveAttribute('src', '');

    const moreDetails = getByText('More details');
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = getByText('Pokémon favoritado?');
    userEvent.click(favorite);
    history.push('/');
    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
