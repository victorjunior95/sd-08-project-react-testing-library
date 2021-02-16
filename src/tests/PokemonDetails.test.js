import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('PokemonDetails.js', () => {
  it('detailed information of the selected Pokémon is shown on the screen', () => {
    const { queryByRole, getByText, getByRole, history } = renderWithRouter(<App />);
    const zero = 0;
    let timesToClick = zero;
    pokemons.forEach((pokemon) => {
      const toDetails = getByRole('link',
        { name: /More details/i });
      expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(toDetails);

      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);

      const nameDetail = getByRole('heading',
        { name: `${pokemon.name} Details`,
          level: 2 });
      expect(nameDetail).toBeInTheDocument();

      const linkDetails = queryByRole('link',
        { name: /More details/i });
      expect(linkDetails).not.toBeInTheDocument();

      const summary = getByRole('heading',
        { name: 'Summary',
          level: 2 });
      expect(summary).toBeInTheDocument();

      const summaryParagraph = getByText(pokemon.summary);
      expect(summaryParagraph).toBeInTheDocument();

      const toHome = getByRole('link',
        { name: /Home/i });
      userEvent.click(toHome);

      for (let index = zero; index <= timesToClick; index += 1) {
        const nextPokemonButton = getByText(/Próximo pokémon/i);
        userEvent.click(nextPokemonButton);
      }
      timesToClick += 1;
    });
  });
  it('there is a section on the page with maps containing the locations of the pokémon',
    () => {
      const { getAllByAltText,
        getByText, getByRole, history } = renderWithRouter(<App />);

      const zero = 0;
      let timesToClick = zero;
      pokemons.forEach((pokemon) => {
        const toDetails = getByRole('link',
          { name: /More details/i });
        expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

        userEvent.click(toDetails);

        const { location: { pathname } } = history;
        expect(pathname).toBe(`/pokemons/${pokemon.id}`);

        const locationTitle = getByRole('heading',
          { name: `Game Locations of ${pokemon.name}`,
            level: 2 });
        expect(locationTitle).toBeInTheDocument();

        const imgLocationList = getAllByAltText(`${pokemon.name} location`);
        const srcImgLocationList = imgLocationList.map(({ src }) => src);
        const imgMapList = pokemon.foundAt.map(({ map }) => map);
        expect(srcImgLocationList).toEqual(imgMapList);

        const toHome = getByRole('link',
          { name: /Home/i });
        userEvent.click(toHome);

        for (let index = zero; index <= timesToClick; index += 1) {
          const nextPokemonButton = getByText(/Próximo pokémon/i);
          userEvent.click(nextPokemonButton);
        }
        timesToClick += 1;
      });
    });
  it('the user can bookmark a pokémon through the details page', () => {
    const { getByLabelText, getByText, getByRole } = renderWithRouter(<App />);
    const zero = 0;
    let timesToClick = zero;
    pokemons.forEach((pokemon) => {
      const toDetails = getByRole('link',
        { name: /More details/i });
      expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(toDetails);

      const checkFavorite = getByLabelText(/Pokémon favoritado/i);
      // console.log(checkFavorite);
      userEvent.click(checkFavorite);

      if (checkFavorite.checked) {
        const starIcon = getByRole('img', {
          name: `${pokemon.name} is marked as favorite`,
        });
        expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
      }

      const toHome = getByRole('link',
        { name: /Home/i });
      userEvent.click(toHome);

      for (let index = zero; index <= timesToClick; index += 1) {
        const nextPokemonButton = getByText(/Próximo pokémon/i);
        userEvent.click(nextPokemonButton);
      }
      timesToClick += 1;
    });
  });
});
