import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Teste do componente PokemonDetails', () => {
  it('Teste de informações detalhadas do pokemon', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />);

    expect(screen.getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'More details' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pokémon roasts hard/i)).toBeInTheDocument();
  });

  it('Teste em seção de mapas e localização do pokemon', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />);

    expect(screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    })).toBeInTheDocument();

    const POKEMON = 'Pikachu location';
    expect(screen.getAllByRole('img', { name: POKEMON }).length).toBe(2);
    expect(screen.getAllByRole('img', { name: POKEMON })[0].src)
      .toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getAllByRole('img', { name: 'Pikachu location' })[1].src)
      .toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste de pokemon favoritado', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />);

    const POKEMON_FAVORITE = 'Pokémon favoritado?';
    expect(screen.getByLabelText(POKEMON_FAVORITE)).toBeInTheDocument();
    expect(screen.getByLabelText(POKEMON_FAVORITE).checked).toBe(true);

    fireEvent.change(screen.getByLabelText(POKEMON_FAVORITE), {
      target: { checked: false },
    });
    expect(screen.getByLabelText(POKEMON_FAVORITE).checked).toBe(false);
  });
});
