import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const allFavs = { 4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false };
const smallFavs = { 4: false, 25: true };
const smallPokes = [
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
    summary: 'This intelligent',
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
    summary: 'The flame on its tai',
  },
];

describe('Requisito 5', () => {
  it('Teste se página contém um heading h2 com o texto', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: true } }
    />);
    const header = screen.getByRole('heading', {
      level: 2,
    });
    expect(header.innerHTML).toBe('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão', () => {
    renderWithRouter(<Pokedex
      pokemons={ smallPokes }
      isPokemonFavoriteById={ smallFavs }
    />);
    const botao = screen.getByTestId('next-pokemon');
    userEvent.click(botao);
    const pokemonName = screen.getByText(/Charmander/i);
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(botao);
    const pokemonName2 = screen.getByText(/Pikachu/i);
    expect(pokemonName2).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      pokemons={ smallPokes }
      isPokemonFavoriteById={ smallFavs }
    />);
    const names = document.querySelectorAll('.pokemon-overview');
    expect(names).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex
      pokemons={ smallPokes }
      isPokemonFavoriteById={ smallFavs }
    />);
    const botoes = document.querySelectorAll('.button-text');
    expect(botoes.length).toBeGreaterThan(1);
  });

  it('Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ allFavs }
    />);
    const botoes = document.querySelectorAll('.button-text');
    const botao = screen.getByTestId('next-pokemon');
    userEvent.click(botoes[2]);
    userEvent.click(botao);
    const pokeName = screen.getByText(/Rapidash/);
    expect(pokeName).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ allFavs }
    />);
    const botoes = document.querySelectorAll('.button-text');
    const botao = screen.getByTestId('next-pokemon');
    userEvent.click(botoes[2]);
    userEvent.click(botao);
    userEvent.click(botoes[0]);
    const pokeName = screen.getByText(/Pikachu/);
    expect(pokeName).toBeInTheDocument();
  });

  it('Teste se é criado um botão de filtro para cada tipo de Pokémon.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ allFavs }
    />);
    const botoes = document.querySelectorAll('.filter-button');
    expect(botoes.length).toBe(8);
  });

  it('Teste se O botão de Próximo pokémon deve ser desabilitado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ allFavs }
    />);
    const botoes = document.querySelectorAll('.button-text');
    const botao = screen.getByTestId('next-pokemon');
    userEvent.click(botoes[1]);
    expect(botao.disabled).toBeTruthy();
  });
});
