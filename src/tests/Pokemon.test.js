import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';

const dataPokemon = {
  id: 143,
  name: 'Snorlax',
  type: 'Normal',
  averageWeight: {
    value: '460.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Vermillion City',
      map: 'https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
    },
  ],
  summary: 'What sounds like its cry may actually be its snores or the'
  + 'rumblings of its hungry belly.',
};

const isFavorite = true;

describe('test Pokemon.js', () => {
  it('card pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ dataPokemon } isFavorite={ isFavorite } />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe('Snorlax');

    const typePokemon = screen.getByTestId('pokemonType');
    expect(typePokemon.innerHTML).toBe('Normal');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon.innerHTML).toBe('Average weight: 460.0 kg');

    const image = screen.getByRole('img', {
      name: /snorlax sprite/i,
    });
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png');
    expect(image.alt).toBe('Snorlax sprite');
  });

  it('details pokemon card', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ dataPokemon }
      isFavorite={ isFavorite }
    />);

    const detailsPokemon = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsPokemon);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/143');
  });

  it('image favorite', () => {
    renderWithRouter(<Pokemon pokemon={ dataPokemon } isFavorite={ isFavorite } />);

    const imageStar = screen.getByRole('img', {
      name: /snorlax is/i,
    });
    expect(imageStar.src).toBe('http://localhost/star-icon.svg');
    expect(imageStar.alt).toBe('Snorlax is marked as favorite');
  });
});
