import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Test pokemon locations', () => {
  it('testing pokemon location heading', () => {
    const { getByRole } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const gameLocationsHeading = getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });

    expect(gameLocationsHeading).toBeInTheDocument();
  });

  it('testing location map images', () => {
    const { getAllByAltText, getByRole } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const mapLocationImages = getAllByAltText(/pikachu location/i);

    expect(mapLocationImages[0]).toBeInTheDocument();
    expect(mapLocationImages[1]).toBeInTheDocument();

    expect(mapLocationImages[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(mapLocationImages[1]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
});

describe('Test pokemon summary', () => {
  it('testing summary heading', () => {
    const { getByRole } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const summaryHeading = getByRole('heading', {
      level: 2,
      name: /summary/i,
    });

    expect(summaryHeading).toBeInTheDocument();
  });

  it('testing summary paragraph', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const summaryParagraph = getByText(
      /This intelligent Pokémon roasts hard berries with electricity/i,
    );

    expect(summaryParagraph).toBeInTheDocument();
  });
});

describe('Test pokemon details', () => {
  it('testing pokemon details heading', () => {
    const { getByRole } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const pokemonDetailsHeading = getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });

    expect(pokemonDetailsHeading).toBeInTheDocument();
  });
});

describe('Test checkbox label', () => {
  it('testing pokemon details heading', () => {
    const { getByLabelText, getByRole } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const checkboxLabel = getByLabelText(/pokémon favoritado/i);

    expect(checkboxLabel).toBeInTheDocument();
  });
});
