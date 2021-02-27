import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test pokemon card', () => {
  it('testing pokemon details', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRouter(<App />);

    const pokemonName = getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(/electric/i);

    const pokemonWeight = getByText(/average weight: 6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonSprite = getByAltText(/pikachu sprite/i);
    expect(pokemonSprite).toBeInTheDocument();
    expect(pokemonSprite).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

describe('test pokemon card', () => {
  it('testing link to details', () => {
    const { getByRole } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });
});

describe('test favorite mark', () => {
  it('test alt and src attributes of star', () => {
    const { getByAltText, getByRole } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    const homeLink = getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    userEvent.click(homeLink);

    const favoriteStar = getByAltText(/pikachu is marked as favorite/i);
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
