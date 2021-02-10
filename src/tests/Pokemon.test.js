import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemon = {
  id: 78,
  name: 'Rapidash',
  type: 'Fire',
  averageWeight: {
    value: '95.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Route 28',
      map: 'https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
    },
    {
      location: 'Johto Mount Silver',
      map: 'https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
    },
  ],
  summary:
    'At full gallop, its four hooves barely touch the ground because'
      + 'it moves so incredibly fast.',
};
const showDetailsLink = true;
const isFavorite = true;

describe('Requisito 6', () => {
  it('should renders right pokemon informations', () => {
    const { queryByText, queryByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const pokemonName = queryByText('Rapidash');
    const pokemonType = queryByText('Fire');
    const averageWeight = queryByText(/Average weight: 95.0 kg/i);
    const image = queryByAltText('Rapidash sprite');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png');
  });

  it('should have a link to more informations', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const moreDetails = getByRole('link', {
      name: /More details/i,
    });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/78');
  });

  it('should render pokemon details', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const moreDetails = getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/78');
  });

  it('should be the same id', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const moreDetails = getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(moreDetails);
    const id = parseInt(history.location.pathname.split('/')[2], 10);
    expect(id).toBe(pokemon.id);
  });

  it('should have a favorite icon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const isFavoriteImage = getByAltText('Rapidash is marked as favorite');
    expect(isFavoriteImage).toBeInTheDocument();
    expect(isFavoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
