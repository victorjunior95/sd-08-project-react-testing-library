import React from 'react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';

const pikachu = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.',
  },
];

const path = '/pokemons/:id';
const url = '/pokemons/25';

describe('req 6', () => {
  it('renderiza as informações correta', () => {
    const favs = { 25: false };
    const match = {
      path,
      url,
      isExact: true,
      params: { id: 25 },
    };
    const { getByRole, queryByText, getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pikachu }
        isPokemonFavoriteById={ favs }
        match={ match }
      />,
    );
    const headerGeneral = getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    const details = queryByText('More details');
    const headerSummary = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const subSummary = getByText('This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.');
    expect(headerGeneral).toBeInTheDocument();
    expect(details).toBeNull();
    expect(headerSummary).toBeInTheDocument();
    expect(subSummary).toBeInTheDocument();
  });

  it('renderiza os mapas', () => {
    const favs = { 25: false };
    const match = {
      path,
      url,
      isExact: true,
      params: { id: 25 },
    };
    const { getByRole, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pikachu }
        isPokemonFavoriteById={ favs }
        match={ match }
      />,
    );
    const mapsHeading = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    const images = getAllByAltText('Pikachu location');
    expect(mapsHeading).toBeInTheDocument();
    expect(images.length).toBe(2);
    expect(images[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('favoritar funciona', () => {
    const favs = { 25: false };
    const match = {
      path,
      url,
      isExact: true,
      params: { id: 25 },
    };
    const { getByLabelText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pikachu }
        isPokemonFavoriteById={ favs }
        match={ match }
      />,
    );
    const favoriteBox = getByLabelText('Pokémon favoritado?');
    expect(favoriteBox).toBeInTheDocument();
  });
});
