import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemonData from '../data';

const mockedPokemon = pokemonData[0];

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByRole, getByText, getByAltText } = renderWithRouter(<Pokemon
    pokemon={ mockedPokemon }
    isFavorite={ false }
  />);
  const URL = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  expect(getByText(/electric/i)).toBeInTheDocument();
  expect(getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
  expect(getByRole('img').src).toBe(URL);
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ mockedPokemon }
    isFavorite={ false }
  />);
  const linkDetails = getByRole('link', { name: /more details/i });
  expect(linkDetails).toBeInTheDocument();
  expect(linkDetails.href).toContain('/pokemons/25');
});

test('redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkDetails = getByText(/more details/i);
  userEvent.click(linkDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  const detailsButton = getByText(/more details/i);
  userEvent.click(detailsButton);
  const favoriteButton = getByText(/pokémon favoritado/i);
  userEvent.click(favoriteButton);
  const starIcon = getByAltText(/pikachu is marked as favorite/i);
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
