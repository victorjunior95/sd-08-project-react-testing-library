import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

test('primeira leva de testes', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: false } }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />
    </Router>,
  );
  const pokemonName = screen.getByText('Pikachu Details');
  expect(pokemonName).toBeInTheDocument();
  const pokemonlink = screen.queryByText('More details');
  expect(pokemonlink).not.toBeInTheDocument();
  const summaryText = screen.getByRole('heading', {
    level: 2,
    name: /Summary/,
  });
  expect(summaryText).toBeInTheDocument();
  const detailsParagraph = screen.getByText(/This intelligent/i);
  expect(detailsParagraph).toBeInTheDocument();
  const gameLocation = screen.getByRole('heading', {
    level: 2,
    name: /Game Locations of Pikachu/i,
  });
  expect(gameLocation).toBeInTheDocument();
  const locationName = screen.getAllByAltText('Pikachu location');
  expect(locationName[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locationName[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const label = screen.queryByLabelText('Pokémon favoritado?');
  expect(label).toBeInTheDocument();
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox.checked).toEqual(false);
  fireEvent.change(checkbox, { target: { checked: true } });
  expect(checkbox.checked).toEqual(true);
});
