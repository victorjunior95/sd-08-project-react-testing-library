import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('renders a about page', () => {
  const history = createMemoryHistory();
  const { getByText, getByAltText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const linkToHome = getByText(/Home/i);

  fireEvent.click(linkToHome);
  expect(history.location.pathname).toBe('/');

  const pokeName = screen.getByTestId('pokemon-name');
  const pokeType = screen.getByTestId('pokemonType');
  const pokeWeight = screen.getByTestId('pokemon-weight');
  const dexImg = getByAltText(`${pokeName.innerHTML} sprite`);
  const pokemonData = pokemons.find((e) => e.name === pokeName.innerHTML);
  expect(!!pokemonData).toBe(true);
  expect(pokeName.innerHTML).toBe(pokemonData.name);
  expect(pokeType.innerHTML).toBe(pokemonData.type);
  expect(pokeWeight.innerHTML).toBe(
    `Average weight: ${pokemonData.averageWeight.value} kg`,
  );
  expect(dexImg.src).toBe(pokemonData.image);

  const details = screen.getByText(/More details/i);
  expect(details).toBeInTheDocument();
  expect(details.href).not.toBe('');

  fireEvent.click(details);
  expect(history.location.pathname).toBe(`/pokemons/${pokemonData.id}`);

  const favorite = getByText(/Pokémon favoritado?/i);
  fireEvent.click(favorite);

  const favoritePokeName = screen.getByTestId('pokemon-name');
  const altTxt = `${favoritePokeName.innerHTML} is marked as favorite`;
  const favIcon = getByAltText(altTxt);
  expect(favIcon).toBeInTheDocument();
  expect(favIcon.src).not.toBe('');
  expect(favIcon.alt).not.toBe('');
});
