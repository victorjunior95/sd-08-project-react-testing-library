import React from 'react';
import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';
import App from '../App';
import pokemons from '../data';

const pokemonsRoll = pokemons;
const { id, name, summary, foundAt } = pokemonsRoll[0];

describe('testing the <PokemonDetails.js /> component', () => {
  test(`If detailed information about the 
  selected Pokémon is shown on the screen.`, () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
        match={ { params: { id: pokemonsRoll[0].id } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ pokemons }
      />,
    );
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    expect(screen.queryByRole('link', { href: `/pokemons/${id}` })).not.toBe();
    expect(
      screen.getByRole('heading', { name: 'Summary' }),
    ).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  test(`If there is a section on the page with 
  maps containing the locations of the pokémon`, () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
        match={ { params: { id: pokemonsRoll[0].id } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ pokemons }
      />,
    );
    expect(
      screen.getByRole('heading', { name: `Game Locations of ${name}` }),
    ).toBeInTheDocument();
    expect(screen.queryAllByAltText(`${name} location`).length).toBe(
      foundAt.length,
    );
    foundAt.forEach(({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      expect(screen.queryAllByRole('img', { src: map })[index + 1].src).toBe(
        map,
      );
    });
  });

  test('If the user can favor a pokémon through the details page.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    expect(screen.getByText(/pokémon favoritado?/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/pokémon favoritado?/i));
    expect(
      screen.getByRole('img', { name: `${name} is marked as favorite` }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText(/pokémon favoritado?/i));
    expect(
      screen.queryByRole('img', { name: `${name} is marked as favorite` }),
    ).not.toBe();
    expect(screen.getByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});
