import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const favorite = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

describe('Pokemon component test', () => {
  it('A card must be rendered with the information of a certain Pokémon.', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[5] } isFavorite={ favorite[pokemons[5].id] } />,
    );

    const { value, measurementUnit } = pokemons[5].averageWeight;

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImg = getByRole('img', {
      name: `${pokemonName.textContent} sprite`,
    });

    const name = `${pokemons[5].name} sprite`;

    const averageWeight = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonName.textContent).toBe(pokemons[5].name);
    expect(pokemonType.textContent).toBe(pokemons[5].type);
    expect(pokemonWeight.textContent).toBe(averageWeight);
    expect(pokemonImg.src).toBe(pokemons[5].image);
    expect(pokemonImg.alt).toBe(name);
  });

  it(`The Pokémon card indicated on the Pokédex must contain a navigation link 
  to display details of this Pokémon. The link must have the URL/pokemons/<id>`, () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[5] } isFavorite={ favorite[pokemons[5].id] } />,
    );

    const link = getByRole('link', {
      name: 'More details',
    });
    expect(link).toHaveAttribute('href', `/pokemons/${pokemons[5].id}`);
  });

  it('There must be a star icon on the favorite Pokémon.', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[5] } isFavorite />,
    );

    const iconFavorite = getByRole('img', {
      name: `${pokemons[5].name} is marked as favorite`,
    });

    expect(iconFavorite).toBeInTheDocument();
    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
