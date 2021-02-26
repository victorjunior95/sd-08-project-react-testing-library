import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testing Pokemon.js component if', () => {
  it('a card is rendered with the information of a certain Pokémon', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const pokemonWeigth = pokemons[0].averageWeight.value;
    const weigthUnit = pokemons[0].averageWeight.measurementUnit;
    const pokemonName = getByText(pokemons[0].name);
    const pokemonType = getByText(pokemons[0].type);
    const pokemonAverage = getByText(`Average weight: ${pokemonWeigth} ${weigthUnit}`);
    const pokemonImage = getByRole('img').src;
    const pokemonAltImage = getByAltText(`${pokemons[0].name} sprite`).alt;

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonAverage).toBeInTheDocument();
    expect(pokemonImage).toBe(pokemons[0].image);
    expect(pokemonAltImage).toBe('Pikachu sprite');
  });

  it(`the Pokémon card indicated on the Pokédex contains a navigation link to view 
      details of this Pokémon`, () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const detailsLink = getByRole('link', { name: 'More details' });

    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toContain(pokemons[0].id);
  });

  it(`by clicking on the Pokémon navigation link, the application is redirected 
      to the Pokémon details page`, () => {
    const { getByRole, history, getByText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: 'More details' });

    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    expect(getByText(`${pokemons[0].name} Details`));
  });

  it('there is a star icon on favorite Pokémon', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const altFavorite = `${pokemons[0].name} is marked as favorite`;
    const starIcon = getByRole('img', { name: altFavorite });

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.alt).toBe(altFavorite);
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
