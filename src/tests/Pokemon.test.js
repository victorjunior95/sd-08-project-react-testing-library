import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Pokemon.js', () => {
  test('if the card render has the correct infos', () => {
    renderWithRouter(<App />);

    const cardName = screen.getByTestId(/pokemon-name/i);
    const cardType = screen.getByTestId(/pokemonType/i);
    const cardWeight = screen.getByTestId(/pokemon-weight/i);
    const cardImg = screen.getByRole('img');

    expect(cardName).toHaveTextContent(/pikachu/i);
    expect(cardType).toHaveTextContent(/electric/i);
    expect(cardWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(cardImg.src).toContain('http');
    expect(cardImg.alt).toContain('sprite');
  });

  test('the link of details', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetail = screen.getByRole('link', { name: /More details/i });
    expect(linkDetail.href).toContain('/pokemons/');
    expect(linkDetail).toBeInTheDocument();

    userEvent.click(linkDetail);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('if it has a favorite icon image when marked', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/143');

    const detailHeading = screen.getByRole('heading', { level: 2, name: /details/i });
    expect(detailHeading).toBeInTheDocument();

    const favoriteMarker = screen.getByLabelText(/Pokémon favoritado\?/i);
    userEvent.click(favoriteMarker);

    const favoriteIcon = screen.getByAltText(/Snorlax is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
