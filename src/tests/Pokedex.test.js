import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';

const mockPokemons = [
  {
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
    summary: `This intelligent Pokémon roasts hard berries with electricity to make them 
    tender enough to eat.`,
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
    summary: `The flame on its tail shows the strength of its life force. If it is weak, 
    the flame also burns weakly.`,
  },
  {
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
    summary: `For protection, it releases a horrible stench from the antennae on its 
    head to drive away enemies.`,
  },
];

describe('teste da pokedéx', () => {
  test('testa se tem um titulo com o texto Encountered pokémons',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ {} }
      />);

      const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
      expect(h2).toBeInTheDocument();
    });

  test(`testa se quando clicado, o botao next renderiza o próximo 
  pokemon da lista.`, () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ {} }
      pokemons={ mockPokemons }
    />);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextPokemonButton);

    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Testa se é renderizado um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ {} }
      pokemons={ mockPokemons }
    />);
    const pokemoncard = screen.getAllByTestId('pokemon-name').length;
    expect(pokemoncard).toBe(1);
  });

  test('Testa se os botoes de filtro existem', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ {} }
      pokemons={ mockPokemons }
    />);
    const filterAllButton = screen.getByRole('button', { name: /All/i });
    expect(filterAllButton).toBeInTheDocument();

    const filterTypesButton = screen.getAllByTestId('pokemon-type-button');

    expect(filterTypesButton.length).toBe(mockPokemons.length);

    const buttonType0 = screen.getByRole('button', { name: mockPokemons[0].type });
    const buttonType1 = screen.getByRole('button', { name: mockPokemons[1].type });
    const buttonType2 = screen.getByRole('button', { name: mockPokemons[2].type });

    expect(buttonType0).toBeInTheDocument();
    expect(buttonType1).toBeInTheDocument();
    expect(buttonType2).toBeInTheDocument();

    userEvent.click(buttonType0);
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton.disabled).toBeTruthy();

    userEvent.click(filterAllButton);

    const firstPokemon = screen.getByText(mockPokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    const secondPokemon = screen.getByText(mockPokemons[1].name);
    expect(secondPokemon).toBeInTheDocument();
  });
});
