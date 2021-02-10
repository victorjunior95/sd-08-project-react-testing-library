import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import data from '../data';

const match = {
  isExact: true,
  params: { id: '4' },
  path: '/pokemons/:id',
  url: '/pokemons/4',
};

const isPokemonFavoriteById = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('test PokemonDetails.js', () => {
  it('test details infos', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ data }
      match={ match }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nameDetails = screen.getByRole('heading', {
      level: 2,
      name: /Charmander Details/i,
    });
    expect(nameDetails).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      name: /Summary/i,
    });
    expect(summary).toBeInTheDocument();

    const description = screen.getByText(/the flame/i);
    expect(description).toBeInTheDocument();
  });

  it('section maps details', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ data }
      match={ match }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const tilteMaps = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Charmander/i,
    });
    expect(tilteMaps).toBeInTheDocument();

    const images = screen.getAllByRole('img', {
      name: /location/i,
    });

    images.forEach((location) => {
      expect(location.src).not.toBe('');
      expect(location.alt).toBe('Charmander location');
    });
  });

  it('checkbox favorite', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ data }
      match={ match }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const inputFavorite = screen.getByRole('checkbox');
    expect(inputFavorite).toBeInTheDocument();

    const inputLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(inputLabel).toBeInTheDocument();
  });
});
