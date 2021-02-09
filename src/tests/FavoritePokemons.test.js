import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';

import App from '../App';

const favoriteLink = 'Favorite Pokémons';
const detailsLink = 'More details';

describe('FavoritePokemons.js', () => {
  it('shows a message if there isnt a favorite pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    const favoritePokemonLink = getByText(favoriteLink);
    userEvent.click(favoritePokemonLink);

    const aboutInfo = getByText('No favorite pokemon found');
    expect(aboutInfo).toBeInTheDocument();
  });

  it('shows all favorite pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const fireLink = getByText('Fire');
    userEvent.click(fireLink);

    const detailsLinkA = getByText(detailsLink);
    userEvent.click(detailsLinkA);

    const charmanderCheckbox = getByRole('checkbox');
    expect(charmanderCheckbox.checked).toEqual(false);
    userEvent.click(charmanderCheckbox);
    expect(charmanderCheckbox.checked).toEqual(true);

    const homeLink = getByText('Home');
    userEvent.click(homeLink);

    const dragonLink = getByText('Dragon');
    userEvent.click(dragonLink);

    const detailsLinkB = getByText(detailsLink);
    userEvent.click(detailsLinkB);

    const dragonairCheckbox = getByRole('checkbox');
    expect(dragonairCheckbox.checked).toEqual(false);
    userEvent.click(dragonairCheckbox);
    expect(dragonairCheckbox.checked).toEqual(true);

    const favoritePokemonLink = getByText(favoriteLink);
    userEvent.click(favoritePokemonLink);

    const charmanderCard = getByText('Charmander');
    expect(charmanderCard).toBeInTheDocument();

    const dragonairCard = getByText('Dragonair');
    expect(dragonairCard).toBeInTheDocument();
  });

  it('doesnt show a pokemon if he is not favorite', () => {
    const { getByText, getByRole, queryByText } = renderWithRouter(<App />);

    const psychicLink = getByText('Psychic');
    userEvent.click(psychicLink);

    const detailsLinkA = getByText(detailsLink);
    userEvent.click(detailsLinkA);

    const alakazamCheckbox = getByRole('checkbox');
    expect(alakazamCheckbox.checked).toEqual(false);

    const favoritePokemonLink = getByText(favoriteLink);
    userEvent.click(favoritePokemonLink);

    const alakazamCard = queryByText('Alakazam');
    expect(alakazamCard).not.toBeInTheDocument();
  });
});
