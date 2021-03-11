import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import { Pokemon } from '../components';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';

describe('Pokemon.js', () => {
  it('shows all info about selected pokemon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[8] } isFavorite />,
    );

    const pokemonName = getByText('Dragonair');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = getByText('Dragon');
    expect(pokemonType).toBeInTheDocument();

    const pokemonWeight = getByText('Average weight: 16.5 kg');
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImage = getByAltText('Dragonair sprite');
    expect(pokemonImage.src).toContain('https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
  });

  it('has a link that redirects to a page with details', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[8] } isFavorite />,
    );

    const detailsLink = getByText(moreDetails);
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemons/148');
  });

  it('redirects to details page when clicked on info link', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const dragonButton = getByRole('button', {
      name: 'Dragon',
    });
    userEvent.click(dragonButton);

    const detailsLink = getByText(moreDetails);
    userEvent.click(detailsLink);

    const pokemonInfo = getByText(/they say that if it emits an aura/i);
    expect(pokemonInfo).toBeInTheDocument();
  });

  it('redirects to expected url when info link is clicked', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[8] } isFavorite />,
    );

    const detailsLink = getByText(moreDetails);
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/148');
  });

  it('shows favorite icon when pokemon is favorite', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[8] } isFavorite />,
    );

    const favoriteIcon = getByAltText('Dragonair is marked as favorite');
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
