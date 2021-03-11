import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';

import App from '../App';

const favoritePokemons = 'Favorite Pokémons';
const detailsFavPokemonsLink = 'More details';

describe('FavoritePokemons.js', () => {
  test('should show a message if there isnt a favorite pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemonsLink = getByText(favoritePokemons);

    userEvent.click(favoritePokemonsLink);
    const aboutInfo = getByText('No favorite pokemon found');

    expect(aboutInfo).toBeInTheDocument();
  });

  test('should show all favorite pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const poisonPokemonsLink = getByText('Poison');
    userEvent.click(poisonPokemonsLink);

    const detailsPokemonsLink = getByText(detailsFavPokemonsLink);
    userEvent.click(detailsPokemonsLink);

    const ekansPokemonCheckbox = getByRole('checkbox');
    expect(ekansPokemonCheckbox.checked).toEqual(false);
    userEvent.click(ekansPokemonCheckbox);

    expect(ekansPokemonCheckbox.checked).toEqual(true);

    const homeLink = getByText('Home');
    userEvent.click(homeLink);

    const dragonPokemonsLink = getByText('Dragon');
    userEvent.click(dragonPokemonsLink);

    const detailsPokemonsLinkA = getByText(detailsFavPokemonsLink);
    userEvent.click(detailsPokemonsLinkA);

    const dragonairPokemonCheckbox = getByRole('checkbox');

    expect(dragonairPokemonCheckbox.checked).toEqual(false);

    userEvent.click(dragonairPokemonCheckbox);

    expect(dragonairPokemonCheckbox.checked).toEqual(true);

    const favoritePokemonsLinkA = getByText(favoritePokemons);
    userEvent.click(favoritePokemonsLinkA);

    const ekansPokemonCard = getByText('Ekans');

    expect(ekansPokemonCard).toBeInTheDocument();

    const dragonairPokemonCard = getByText('Dragonair');

    expect(dragonairPokemonCard).toBeInTheDocument();
  });

  test(' should not show a pokemon if it is not favorite', () => {
    const { getByText, getByRole, queryByText } = renderWithRouter(<App />);

    const normalPokemonsLink = getByText('Normal');
    userEvent.click(normalPokemonsLink);

    const detailsPokemonsLinkB = getByText(detailsFavPokemonsLink);
    userEvent.click(detailsPokemonsLinkB);

    const snorlaxPokemonCard = getByRole('checkbox');

    expect(snorlaxPokemonCard.checked).toEqual(false);

    const favoritePokemonsLinkB = getByText(favoritePokemons);
    userEvent.click(favoritePokemonsLinkB);

    const snorlaxPokemonCardNotFound = queryByText('Snorlax');

    expect(snorlaxPokemonCardNotFound).not.toBeInTheDocument();
  });
});

// https://testing-library.com/docs/react-testing-library/cheatsheet/
// https://testing-library.com/docs/dom-testing-library/api-events/
