import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import App from '../App';
import pokemons from '../data';

const POKEMON = pokemons[0];

describe('Pokemon card', () => {
  it('Should render a pokemon card', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite={ false }
    />);

    const imageURL = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByText(/electric/i)).toBeInTheDocument();
    expect(getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
    expect(getByRole('img').src).toBe(imageURL);
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  it('Should render a link to pokemon details', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite={ false }
    />);

    const detailsLink = getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toContain('/pokemons/25');
  });

  it('Should details link redirect to pokemon details', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  it('Should render a star icon for favorited pokemon', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite
    />);

    const favIcon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toContain('/star-icon.svg');
  });
});
