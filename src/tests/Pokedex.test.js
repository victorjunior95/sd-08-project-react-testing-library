import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helper/renderWithRouter';
import Pokedex from '../components/Pokedex';

const mockedPokemons = [{
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
},
{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
  summary: `The flame on its tail shows the strength of
    its life force. If it is weak, the flame also burns weakly.`,
}, {
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: {
    value: '2.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 30',
      map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
    },
    {
      location: 'Johto Route 31',
      map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
    },
    {
      location: 'Ilex Forest',
      map: 'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
    },
    {
      location: 'Johto National Park',
      map: 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
    },
  ],
  summary: `For protection, it releases a horrible
  stench from the antennae on its head to drive away enemies.`,
}];

describe('Teste componenente Pokedex.js', () => {
  it(`Teste se página contém um heading h2 com o
    texto Encountered pokémons.`, () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ {} }
      pokemons={ mockedPokemons }
    />);
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista quando o
    botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ {} }
      pokemons={ mockedPokemons }
    />);
    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextPokemon);

    const nextPokemonName = screen.getByText('Charmander');
    expect(nextPokemonName).toBeInTheDocument();

    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);

    const firstPokeName = screen.getByText('Pikachu');
    expect(firstPokeName).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ {} }
      pokemons={ mockedPokemons }
    />);
    const pokemon = screen.getAllByTestId('pokemon-name').length;
    expect(pokemon).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ {} }
      pokemons={ mockedPokemons }
    />);
    const filterAll = screen.getByRole('button', { name: /All/i });
    expect(filterAll).toBeInTheDocument();

    const filterTypesButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterTypesButton.length).toBe(mockedPokemons.length);
    const filterTypePoke0 = screen.getByRole('button', { name: mockedPokemons[0].type });
    const filterTypePoke1 = screen.getByRole('button', { name: mockedPokemons[1].type });
    const filterTypePoke2 = screen.getByRole('button', { name: mockedPokemons[2].type });
    expect(filterTypePoke0).toBeInTheDocument();
    expect(filterTypePoke1).toBeInTheDocument();
    expect(filterTypePoke2).toBeInTheDocument();

    userEvent.click(filterTypePoke0);
    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(filterAll);
    const pokemon1 = screen.getByText(mockedPokemons[0].name);
    expect(pokemon1).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const pokemon2 = screen.getByText(mockedPokemons[1].name);
    expect(pokemon2).toBeInTheDocument();
  });
});
