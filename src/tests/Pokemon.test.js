import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  test('Testa as informações mostradas pelo card', () => {
    const { getByTestId, getByAltText, getByText, history } = renderWithRouter(<App />);
    const nome = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const img = getByAltText('Pikachu sprite');
    expect(nome).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAttribute('src', '');

    const moreDetails = getByText('More details');
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = getByText('Pokémon favoritado?');
    fireEvent.click(favorite);
    history.push('/');
    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
