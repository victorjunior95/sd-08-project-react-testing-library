import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';

import { Pokemon } from '../components';
import App from '../App';
import pokemons from '../data';

const detailsPokemonsLink = 'More details';

describe('Pokemon.js', () => {
  test('should show all info about the selected pokemon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );

    const pokemonName = getByText('Charmander');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = getByText('Fire');
    expect(pokemonType).toBeInTheDocument();

    const pokemonWeight = getByText('Average weight: 8.5 kg');
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImage = getByAltText('Charmander sprite');
    expect(pokemonImage.src).toContain('https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  test('should have a link that redirects to the page with details', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );

    const pokemonButtonDetails = getByText(detailsPokemonsLink);

    expect(pokemonButtonDetails).toBeInTheDocument();
    expect(pokemonButtonDetails).toHaveAttribute('href', '/pokemons/4');
  });

  test('should redirect to details page when clicked at info link', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const firePokemonsButton = getByRole('button', {
      name: 'Fire',
    });
    userEvent.click(firePokemonsButton);

    const pokemonButtonDetails = getByText(detailsPokemonsLink);
    userEvent.click(pokemonButtonDetails);

    const pokeDetailsInfo = getByText(/The flame on its tail shows the strength/i);

    expect(pokeDetailsInfo).toBeInTheDocument();
  });

  test('should redirect to expected url when info link is clicked', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );

    const pokemonButtonDetails = getByText(detailsPokemonsLink);
    userEvent.click(pokemonButtonDetails);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/4');
  });

  test('should show favorite icon - start - when pokemon is favorite', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );

    const favoritePokemonIcon = getByAltText('Charmander is marked as favorite');

    expect(favoritePokemonIcon.src).toContain('/star-icon.svg');
  });
});

// https://testing-library.com/docs/dom-testing-library/cheatsheet
// not use render - example - Aula15.1 - Icaro
