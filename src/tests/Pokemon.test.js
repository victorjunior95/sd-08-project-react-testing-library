import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Must shown the correct Pokémon information', () => {
  it('Name', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });
  it('Type', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
  });
  it('Average Weight', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
  });
  it('Image', () => {
    const { getByRole } = renderWithRouter(<App />);
    const imgPokemon = getByRole('img');

    expect(imgPokemon).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
});

test('A link navigation to shown details about this Pokémon', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkDetails = getByText(/More details/i);

  expect(linkDetails).toBeInTheDocument();
  expect(linkDetails).toHaveAttribute('href', '/pokemons/25');

  userEvent.click(linkDetails);

  expect(history.location.pathname).toBe('pokemons/25');
});

test('Should have a star icon in favorites Pokémons', () => {
  const pokemon = pokemons[0];
  const { getByAltText } = renderWithRouter(<Pokemon isFavorite pokemon={ pokemon } />);
  const starIcon = getByAltText('Pikachu is marked as favorite');

  expect(starIcon.src).toBe('http://localhost/star-icon.svg');
});
