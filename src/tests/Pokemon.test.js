import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const moreDetails = 'More details';

test('Se é renderizado um card com as informações de determinado pokémon.', () => {
  renderWithRouter(<App />);

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe('Pikachu');

  const pokemonType = screen.getByTestId('pokemonType');
  expect(pokemonType.innerHTML).toBe('Electric');

  const pikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu')[0];
  const { name, image, averageWeight: { value, measurementUnit } } = pikachu;
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

  const pokemonImg = screen.getByRole('img');
  expect(pokemonImg).toBeInTheDocument();
  expect(pokemonImg.src).toBe(image);
  expect(pokemonImg.alt).toBe(`${name} sprite`);
});

test('Se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  renderWithRouter(<App />);

  const pikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu')[0];
  const { id } = pikachu;
  const pokemonLink = screen.getByRole('link', {
    name: moreDetails,
  });
  expect(pokemonLink.href).toBe(`http://localhost/pokemons/${id}`);
});

test('Se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
  renderWithRouter(<App />);

  const pokemonLink = screen.getByRole('link', {
    name: moreDetails,
  });
  fireEvent.click(pokemonLink);

  const headingDetails = screen.getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(headingDetails).toBeInTheDocument();
});

test('Se URL exibida no navegador muda para /pokemon/<id> após redirecionamento', () => {
  const { history } = renderWithRouter(<App />);

  const pokemonLink = screen.getByRole('link', {
    name: moreDetails,
  });
  fireEvent.click(pokemonLink);

  const pikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu')[0];
  const { id } = pikachu;

  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${id}`);
});

test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { history } = renderWithRouter(<App />);

  const pikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu')[0];
  const { id, name } = pikachu;

  history.push(`/pokemons/${id}`);
  const favoriteCheck = screen.getByRole('checkbox');
  fireEvent.click(favoriteCheck);

  const pokemonFavorite = screen.getAllByRole('img')[1];

  expect(pokemonFavorite).toBeInTheDocument();
  expect(pokemonFavorite.src).toBe('http://localhost/star-icon.svg');
  expect(pokemonFavorite.alt).toBe(`${name} is marked as favorite`);
});
