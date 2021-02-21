import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokemon.js', () => {
  it('Verifica se um card é renderizado', () => {
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

      const pokemonImg = getByRole('img', { name: `${name} sprite` });
      expect(pokemonImg).toHaveAttribute('src', image);

      const nextPokemonBtn = getByText(/Próximo pokémon/i);
      userEvent.click(nextPokemonBtn);
    });
  });

  it('verifica se contem o link de navegaçao', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const toDetails = getByRole('link', { name: /More details/i });
      expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      const nextPokemonButton = getByText(/Próximo pokémon/i);
      userEvent.click(nextPokemonButton);
    });
  });

  it('redireciona para pagina de detalhes', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const zero = 0;
    let timesToClick = zero;
    pokemons.forEach((pokemon) => {
      const toDetails = getByRole('link', { name: /More details/i });
      expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(toDetails);
      const {
        location: { pathname },
      } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);

      const toHome = getByRole('link', { name: /Home/i });
      userEvent.click(toHome);

      for (let index = zero; index <= timesToClick; index += 1) {
        const nextPokemonButton = getByText(/Próximo pokémon/i);
        userEvent.click(nextPokemonButton);
      }
      timesToClick += 1;
    });
  });

  it('verifica se existe o icone de favoritar Pokémon', () => {
    const { getByLabelText, getByText, getByRole, history } = renderWithRouter(<App />);
    const zero = 0;
    let countClick = zero;
    pokemons.forEach((pokemon) => {
      const toDetails = getByRole('link', { name: /More details/i });
      expect(toDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(toDetails);
      const {
        location: { pathname },
      } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);

      const checkFavorite = getByLabelText(/Pokémon favoritado/i);
      userEvent.click(checkFavorite);

      if (checkFavorite.checked) {
        const fav = getByRole('img', {
          name: `${pokemon.name} is marked as favorite`,
        });
        expect(fav).toHaveAttribute('src', '/star-icon.svg');
      }

      const goHome = getByRole('link', { name: /Home/i });
      userEvent.click(goHome);

      for (let index = zero; index <= countClick; index += 1) {
        const nextPokemonBtn = getByText(/Próximo pokémon/i);
        userEvent.click(nextPokemonBtn);
      }
      countClick += 1;
    });
  });
});
