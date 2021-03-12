import React from 'react';
import { screen } from '@testing-library/dom';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('tests the component Pokemon', () => {
  it('', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const pokemonName = getByText(/Pikachu/i);
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeigth = getByText(/Average weight: 6.0 kg/i);
    const moreDetails = getByRole('link', { name: /More details/i });

    const icon = screen.getAllByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeigth).toBeInTheDocument();

    expect(icon[0]).toHaveAttribute('alt', 'Pikachu sprite');
    expect(icon[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(icon[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(icon[1]).toHaveAttribute('src', '/star-icon.svg');

    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });
});
