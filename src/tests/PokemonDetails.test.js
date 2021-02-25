import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests pokemons-details page', () => {
  const pikachuTest = pokemons[0];

  test('tests if a level 2 header tag exists', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachuTest.id}`);
    const headingLevel2 = getByRole('heading', { name: 'Pikachu Details' });
    expect(headingLevel2).toBeInTheDocument();
  });
  test('tests if the more-details link is removed', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();
  });
  test('tests if there is an h2 with the text "Summary"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachuTest.id}`);
    const summaryHeading = getByRole('heading', { name: 'Summary', leve: 2 });
    expect(summaryHeading).toBeInTheDocument();
  });
  test('tests if there is a descriptive paragraph of the Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachuTest.id}`);
    const descriptiveParagraph = getByText(pikachuTest.summary);
    expect(descriptiveParagraph).toBeInTheDocument();
  });
  test('tests whether an h2 tag exists for the locations section', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachuTest.id}`);
    const locationsHeading = getByRole(
      'heading',
      { name: `Game Locations of ${pikachuTest.name}`, leve: 2 },
    );
    expect(locationsHeading).toBeInTheDocument();
  });
  test('tests a pokemon locations', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachuTest.id}`);
    const pokemonLocations = pikachuTest.foundAt;
    pokemonLocations.forEach((pokemon) => {
      const pokemonLocation = getByText(pokemon.location);
      expect(pokemonLocation).toBeInTheDocument();
    });
  });
  test('tests whether there is an example image of a pokédex', () => {
    const { getAllByAltText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachuTest.id}`);
    const getImageByAlt = getAllByAltText(`${pikachuTest.name} location`);
    const pokemonLocations = pikachuTest.foundAt;
    expect(getImageByAlt.length).toBe(pokemonLocations.length);

    getImageByAlt.forEach((image, index) => {
      expect(image.src).toBe(pokemonLocations[index].map);
    });
  });
  test('tests favorite checkbox', () => {
    const { getByLabelText, getByAltText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachuTest.id}`);
    const favoriteCheck = getByLabelText('Pokémon favoritado?');
    expect(favoriteCheck).toBeInTheDocument();

    userEvent.click(favoriteCheck);
    expect(favoriteCheck.checked).toEqual(true);
    const starIconAlt = getByAltText(`${pikachuTest.name} is marked as favorite`);
    expect(starIconAlt).toBeInTheDocument();

    userEvent.click(favoriteCheck);
    expect(favoriteCheck.checked).toEqual(false);
    expect(starIconAlt).not.toBeInTheDocument();
  });
});
