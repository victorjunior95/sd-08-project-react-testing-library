import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const pokemonCardInView = pokemons[0];
    const { id, name, type, averageWeight, image } = pokemonCardInView;
    const { value, measurementUnit } = averageWeight;
    const { getByRole, getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemonCardInView }
      isFavorite
    />);
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    const imagePokemon = getByRole('img', { name: `${name} sprite` });
    expect(imagePokemon).toHaveAttribute('src', image);

    const moreDetailsButton = getByRole('link', { name: /more details/i });
    expect(moreDetailsButton).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(moreDetailsButton);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);

    const favoritePokemon = getByRole('img', { name: `${name} is marked as favorite` });
    const srcImage = '/star-icon.svg';
    expect(favoritePokemon).toHaveAttribute('src', srcImage);
  });
});
