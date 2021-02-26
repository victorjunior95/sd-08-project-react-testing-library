import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing PokemonDetails.js component, if', () => {
  it('detailed information of the selected Pokémon is shown on the screen', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });

    userEvent.click(detailsLink);
    const nameDetails = getByText(`${pokemons[0].name} Details`);
    const h2Summary = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const locations = getByText(pokemons[0].summary);

    expect(nameDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(h2Summary).toBeInTheDocument();
    expect(locations).toBeInTheDocument();
  });

  it(`there is a section on the page with maps containing
       the locations of the pokémon`, () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(<App />);

    const pokemonFoundAt = pokemons[0].foundAt;
    const detailsLink = getByRole('link', { name: 'More details' });

    userEvent.click(detailsLink);
    const h2GameLocations = getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
      level: 2,
    });
    const pokemonLocations = getAllByRole('img', {
      name: `${pokemons[0].name} location`,
    });

    expect(h2GameLocations).toBeInTheDocument();
    expect(pokemonLocations.length).toBe(pokemonFoundAt.length);
    for (let i = 0; i < pokemonLocations.length; i += 1) {
      expect(getByText(pokemonFoundAt[i].location)).toBeInTheDocument();
      expect(pokemonLocations[i].src).toBe(pokemonFoundAt[i].map);
      expect(pokemonLocations[i].alt).toBe(`${pokemons[0].name} location`);
    }
  });

  it('the user can bookmark a pokémon through the details page', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const altFavorite = `${pokemons[0].name} is marked as favorite`;
    const detailsLink = getByRole('link', { name: 'More details' });

    userEvent.click(detailsLink);
    const labelCheckbox = getByText('Pokémon favoritado?');
    const favoriteCheckbox = getByRole('checkbox', { id: 'favorite' });

    expect(labelCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    const starIcon = getByRole('img', { name: altFavorite });
    expect(starIcon).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(starIcon).not.toBeInTheDocument();
  });
});
