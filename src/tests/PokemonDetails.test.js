import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: `This intelligent Pokémon roasts hard berries
    with electricity to make them tender enough to eat.`,
};

describe('Teste component PokemonDetails', () => {
  it(`Teste se as informações detalhadas do Pokémon selecionado são
    mostradas na tela.`, () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetails = screen.getByText('More details');
    userEvent.click(pokemonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const detailsPokeName = screen.getByText(/Pikachu Details/i);
    const summary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    const summaryParagraph = screen.getByTestId('paragraph');
    expect(detailsPokeName).toBeInTheDocument();
    expect(pokemonDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();

    const gameLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();

    const pokeHabitat = screen.getAllByRole('img');
    expect(pokeHabitat[0].src).toBe(pokemon.image);
    expect(pokeHabitat[1].src).toBe(pokemon.foundAt[0].map);
    expect(pokeHabitat[1].alt).toBe(`${pokemon.name} location`);
    expect(pokeHabitat[2].alt).toBe(`${pokemon.name} location`);
    expect(pokeHabitat[2].src).toBe(pokemon.foundAt[1].map);
    const location1 = screen.getByText('Kanto Viridian Forest');
    const location2 = screen.getByText('Kanto Power Plant');
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    const favPokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(favPokemon).toBeInTheDocument();
    expect(favPokemon.checked).toBeFalsy();
    userEvent.click(favPokemon);
    expect(favPokemon.checked).toBeTruthy();
    userEvent.click(favPokemon);
    expect(favPokemon.checked).toBeFalsy();
  });
});
