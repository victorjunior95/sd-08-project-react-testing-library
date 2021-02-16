import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Pokemon.js', () => {
  it('a card is rendered with the information of a certain Pokémon', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);
    pokemons.forEach(({ name, type, averageWeight, image }) => {
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);

      const pokemonType = getByTestId('pokemonType');
      expect(pokemonType).toHaveTextContent(type);

      const pokemonWeight = getByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );

      const pokemonImage = getByRole('img',
        { name: `${name} sprite` });
      expect(pokemonImage).toHaveAttribute('src', image);

      const nextPokemonButton = getByText(/Próximo pokémon/i);
      userEvent.click(nextPokemonButton);
    });
  });
  it('contains a navigation link to view details of this Pokémon',
    () => {
      const { getByText, getByRole } = renderWithRouter(<App />);
      pokemons.forEach((pokemon) => {
        const toDetails = getByRole('link',
          { name: /More details/i });
        expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

        const nextPokemonButton = getByText(/Próximo pokémon/i);
        userEvent.click(nextPokemonButton);
      });
    });
  it('redirection of the application to a Pokémon details page', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const zero = 0;
    let timesToClick = zero;
    pokemons.forEach((pokemon) => {
      const toDetails = getByRole('link',
        { name: /More details/i });
      expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(toDetails);
      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);

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
  it('there is a star icon on favorite Pokémon', () => {
    const { getByLabelText, getByText, getByRole, history } = renderWithRouter(<App />);
    const zero = 0;
    let timesToClick = zero;
    pokemons.forEach((pokemon) => {
      const toDetails = getByRole('link',
        { name: /More details/i });
      expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(toDetails);
      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);

      const checkFavorite = getByLabelText(/Pokémon favoritado/i);
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
