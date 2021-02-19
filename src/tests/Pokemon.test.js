import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

test('se é renderizado um card com as informações de um pokémon', () => {
  const { getByText, getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] } // Pikachu
    isFavorite={ false }
  />);
  const namePokemon = getByText(/Pikachu/i);
  const typePokemon = getByText(/electric/i);
  const averageWeight = getByText(/Average weight: 6.0 kg/i);
  const image = getByRole('img', { name: /pikachu sprite/i });
  const imageURL = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

  expect(namePokemon).toBeInTheDocument();
  expect(typePokemon).toBeInTheDocument();
  expect(averageWeight).toBeInTheDocument();
  expect(image).toHaveAttribute('src', imageURL);
  expect(image).toHaveAttribute('alt', 'Pikachu sprite');
});

test('se o card do Pokémon indicado contém link para exibir detalhes', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);
  const moreDetails = getByRole('link', { name: /more details/i });
  expect(moreDetails).toBeInTheDocument();
  expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
});

test('se ao clicar no link de navegação do Pokémon, é redirecionado', () => {
  const { getByRole, getByText, history } = renderWithRouter(<App />);
  const linkMoreDetails = getByRole('link', { name: /more details/i });
  userEvent.click(linkMoreDetails);
  const { pathname } = history.location;

  const pokemonDetails = getByText(/pikachu details/i);
  expect(pathname).toBe('/pokemons/25');
  expect(pokemonDetails).toBeInTheDocument();
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite
  />);
  const favoritePokemon = getByRole('img', { name: /pikachu is marked as favorite/i });
  const imageStar = '/star-icon.svg';
  expect(favoritePokemon).toBeInTheDocument();
  expect(favoritePokemon).toHaveAttribute('src', imageStar);
  expect(favoritePokemon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
