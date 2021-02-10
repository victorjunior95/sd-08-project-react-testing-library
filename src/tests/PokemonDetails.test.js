import React from 'react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { PokemonDetails } from '../components';

describe('test PokemonDetails component', () => {
  test('renders a heading level 2 with text', () => {
    const match = { params: { id: pokemons[0].id } };
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
    />);
    const gameLocation = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(gameLocation).toBeInTheDocument();
  });

  test('renders image(s) with the location', () => {
    const match = { params: { id: pokemons[0].id } };
    const { getAllByAltText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
    />);
    const locationImage = getAllByAltText(`${pokemons[0].name} location`);
    locationImage.forEach((image, index) => {
      expect(image.src).toBe(pokemons[0].foundAt[index].map);
      expect(image.alt).toBe(`${pokemons[0].name} location`);
    });
  });

  test('renders a section with title `Summary` and a text content', () => {
    const match = { params: { id: pokemons[0].id } };
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
    />);
    const summaryTitle = getByText('Summary');
    expect(summaryTitle.innerHTML).toBe(' Summary ');
    const pokemonSummary = getByText(`${pokemons[0].summary}`);
    expect(pokemonSummary.innerHTML).toBe(`${pokemons[0].summary}`);
  });

  test('renders a checkbox with label `Pokémon favoritado?`', () => {
    const match = { params: { id: pokemons[0].id } };
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
    />);
    const label = getByText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
    expect(label.innerHTML.startsWith('Pokémon favoritado?')).toBeTruthy();
  });

  test('renders a heading level 2 for section title', () => {
    const match = { params: { id: pokemons[0].id } };
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
    />);
    const sectionTitle = getByText(`${pokemons[0].name} Details`);
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle.innerHTML).toBe(`${pokemons[0].name} Details`);
  });
});
