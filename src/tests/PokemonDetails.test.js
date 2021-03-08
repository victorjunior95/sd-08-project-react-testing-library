import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

const moreDetails = 'More details';
const pokemonRoute = '/pokemons/25';

describe('Testing component Pokemon Details', () => {
  it('Test: show the pokemon details', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(moreDetails));
    const { pathname } = history.location;
    expect(pathname).toBe(pokemonRoute);

    const pokemonText = getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokemonText).toBeInTheDocument();

    const summaryHeading = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const summaryText1 = 'This intelligent Pokémon roasts hard berries with';
    const summaryText2 = 'electricity to make them tender enough to eat.';
    const summaryText = getByText(`${summaryText1} ${summaryText2}`);
    expect(summaryText).toBeInTheDocument();
  });

  it('Test: show the maps with pokemon locations', () => {
    const { getByText, getByRole, getAllByAltText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(moreDetails));
    const { pathname } = history.location;
    expect(pathname).toBe(pokemonRoute);

    const pokemonLocationTitle = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(pokemonLocationTitle).toBeInTheDocument();

    const locationsImage = getAllByAltText('Pikachu location');
    expect(locationsImage.length).toBe(2);
    expect(locationsImage[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationsImage[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Test: favorite checkbox', () => {
    const { getByText, getByLabelText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(moreDetails));
    const { pathname } = history.location;
    expect(pathname).toBe(pokemonRoute);

    const favoriteCheckbox = getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox).toHaveAttribute('type', 'checkbox');
  });
});
