import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

const POKEMON = pokemons[0];
describe('', () => {
  it('check if a pokemon card is rendered', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ POKEMON } isFavorite={ false } />,
    );
    const imageURL = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByText(/electric/i)).toBeInTheDocument();
    expect(getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
    expect(getByRole('img').src).toBe(imageURL);
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });
  it('check if the card has a link to show the pokemons details', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ POKEMON } isFavorite={ false } />,
    );
    const detailsLink = getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toContain('/pokemons/25');
  });
  it('check if there is a star icon on favorite Pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const detailsLink = getByText(/more details/i);
    userEvent.click(detailsLink);
    const favoriteButton = getByText(/pokémon favoritado/i);
    userEvent.click(favoriteButton);
    const starIcon = getByAltText(/pikachu is marked as favorite/i);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
