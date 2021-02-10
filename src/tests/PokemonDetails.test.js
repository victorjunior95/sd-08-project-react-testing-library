import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const moreDetails = 'More details';

test('Se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { history } = renderWithRouter(<App />);

  const pokemonLink = screen.getByRole('link', {
    name: moreDetails,
  });

  const pikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu')[0];
  const { id, name, summary } = pikachu;

  history.push(`/pokemons/${id}`);
  const pokemonDetail = screen.getByRole('heading', {
    name: `${name} Details`,
  });
  expect(pokemonDetail).toBeInTheDocument();
  expect(pokemonLink).not.toBeInTheDocument();

  const headingDetails = screen.getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(headingDetails).toBeInTheDocument();

  const paragraphSummary = screen.getByText(summary);
  expect(paragraphSummary).toBeInTheDocument();
});

test('Se existe na página seção com os mapas contendo as localizações do pokémon', () => {
  const { history } = renderWithRouter(<App />);

  const pikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu')[0];
  const { id, name, foundAt } = pikachu;

  history.push(`/pokemons/${id}`);
  const headingPokemonName = screen.getByRole('heading', {
    level: 2,
    name: `Game Locations of ${name}`,
  });
  expect(headingPokemonName).toBeInTheDocument();

  const pokemonLocations = screen.getAllByRole('img')
    .filter((img) => img.alt === `${name} location`);
  expect(pokemonLocations.length).toBe(foundAt.length);
  foundAt.map((local) => {
    const pokemonLocationLocal = screen.getByText(local.location);
    const pokemonLocationImg = screen.getAllByRole('img')
      .filter((img) => img.src === local.map)[0];
    expect(pokemonLocationLocal).toBeInTheDocument();
    expect(pokemonLocationImg).toBeInTheDocument();
    return true;
  });
});

test('Se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { history } = renderWithRouter(<App />);

  const pikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu')[0];
  const { id } = pikachu;

  history.push(`/pokemons/${id}`);
  const favoriteCheck = screen.getByRole('checkbox');
  expect(favoriteCheck).toBeInTheDocument();

  fireEvent.click(favoriteCheck);
  const starFavorited = screen.getAllByRole('img')[1];
  expect(starFavorited).toBeInTheDocument();

  fireEvent.click(favoriteCheck);
  expect(starFavorited).not.toBeInTheDocument();

  const labelInput = screen.getByRole('checkbox', {
    name: 'Pokémon favoritado?',
  });
  expect(labelInput).toBeInTheDocument();
});
