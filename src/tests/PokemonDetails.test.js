import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('renders a about page', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const linkToHome = getByText(/Home/i);

  fireEvent.click(linkToHome);
  expect(history.location.pathname).toBe('/');

  const details = screen.getByText(/More details/i);
  expect(details).toBeInTheDocument();
  expect(details.href).not.toBe('');

  const pokeName = screen.getByTestId('pokemon-name');
  const pokemonData = pokemons.find((e) => e.name === pokeName.innerHTML);

  fireEvent.click(details);
  expect(history.location.pathname).toBe(`/pokemons/${pokemonData.id}`);

  const pokeNameDetails = screen.getByText(`${pokeName.innerHTML} Details`);
  expect(pokeNameDetails).toBeInTheDocument();

  const pokemonLocation = screen.getAllByAltText(`${pokeName.innerHTML} location`);
  expect(pokemonData.foundAt.length).toBe(pokemonLocation.length);

  pokemonLocation.forEach((e) => {
    expect(e.src).not.toBe('');
    expect(e.alt).not.toBe('');
  });

  const location = `Game Locations of ${pokeName.innerHTML}`;
  const pokemonNameLocation = screen.getByText(location);
  expect(pokemonNameLocation.innerHTML).toBe(location);

  const summaryH2 = screen.getByText('Summary');
  expect(summaryH2.innerHTML).not.toBe('');

  const summary = screen.getByText(pokemonData.summary);
  expect(summary.innerHTML).not.toBe('');

  const favorite = getByText(/Pokémon favoritado?/i);
  expect(favorite.innerHTML).not.toBe('');
});
