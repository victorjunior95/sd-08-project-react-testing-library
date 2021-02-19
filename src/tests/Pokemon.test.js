import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemon = pokemons[0];
const isFavorite = true;

describe('Testes Pokemon.js', () => {
  test(' Average Weigth Pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const namePoke = screen.getByText(/Pikachu/i);
    expect(namePoke).toBeInTheDocument();
  });

  test('Average weight', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);
    const textWeight = screen.getByText(/Average weight: 6.0 kg/i);

    expect(textWeight).toBeInTheDocument();
    expect(textWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  test('Poke Type', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);
    const pokeType = screen.getByTestId('pokemonType');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toEqual('Electric');
  });

  test('Poke Img', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);
    const img = screen.getAllByRole('img')[0];
    expect(img.alt).toEqual('Pikachu sprite');
    expect(img.src).toEqual('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Poke More details Link', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);
    const moreDetailsLink = screen.getByRole('link');
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;

    expect(pathname).toEqual('/pokemons/25');

    // Page Details
    const icon = screen.getAllByRole('img')[1];
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
    expect(icon.alt).toEqual('Pikachu is marked as favorite');
  });
});
