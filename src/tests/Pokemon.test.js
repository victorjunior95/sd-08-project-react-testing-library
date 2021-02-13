import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

test('Verifica se é renderiza um card com as Informações de determinado pokémon', () => {
  renderWithRouter(<App pokemons={ pokemons } />);
  const namePokemon = screen.getByTestId('pokemon-name');
  expect(namePokemon.innerHTML).toBe('Pikachu');
  const typePokemon = screen.getByTestId('pokemonType');
  expect(typePokemon.innerHTML).toBe('Electric');
  const averageWeightPokemon = screen.getByTestId('pokemon-weight');
  expect(averageWeightPokemon).toHaveTextContent('Average weight: 6.0 kg');
  const imagePokemon = screen.getByRole('img');
  expect(imagePokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(imagePokemon.alt).toBe('Pikachu sprite');
});

test('Verifica se o card do Pokémon indicado contém link de navegação', () => {
  renderWithRouter(<App pokemons={ pokemons } />);
  const buttonDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(buttonDetails);
  const pokemonDetails = screen.getByRole('heading', {
    name: /Pikachu Details/i,
  });
  expect(pokemonDetails).toBeInTheDocument();
});

test('Verifica se a URL exibida no navegador muda para /pokemon/<id>', () => {
  const { history } = renderWithRouter(<App pokemons={ pokemons } />);
  const buttonDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(buttonDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Verifica se existe um icone de estrela nos Pokémons favoritados', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
  const starIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect(starIcon.src).toContain('/star-icon.svg');
});
