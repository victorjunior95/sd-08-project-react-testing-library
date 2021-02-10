import React from 'react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Pokemon } from '../components';

describe('test pokemon component', () => {
  test('renders name, type and weight of a pokemon', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const name = getByTestId('pokemon-name');
    console.log(name.innerHTML);
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pikachu');
    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toBe('Electric');
    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('renders a link to show more details', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const linkToMoreDetails = getByRole('link', { name: /more details/i });
    expect(linkToMoreDetails.href.endsWith(`${pokemons[0].id}`)).toBeTruthy();
  });

  test('renders a image from the given pokemon image path', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const image = getByRole('img');
    console.log(image.src);
    console.log(image.alt);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(pokemons[0].image);
    expect(image.alt).toBe('Pikachu sprite');
  });

  test('renders star favorite icon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const icon = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(icon).toBeInTheDocument();
    expect(icon.alt).toBe(`${pokemons[0].name} is marked as favorite`);
    expect(icon.src).toBe('http://localhost/star-icon.svg');
  });
});
