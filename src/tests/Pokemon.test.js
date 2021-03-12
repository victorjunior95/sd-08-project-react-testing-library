import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

const POKEMON = pokemons[0];

test('rederiza card', () => {
  const { getByText, getByRole, getByAltText } = renderWithRouter(<Pokemon
    pokemon={ POKEMON }
    isFavorite={ false }
  />);

  const urlImage = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

  expect(getByText(/pikachu/i)).toBeInTheDocument();
  expect(getByText(/electric/i)).toBeInTheDocument();
  expect(getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
  expect(getByRole('img').src).toBe(urlImage);
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
});

test('detalhes do pokemon', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ POKEMON }
    isFavorite={ false }
  />);

  const linkDetails = getByRole('link', { name: /more details/i });
  expect(linkDetails).toBeInTheDocument();
  expect(linkDetails.href).toContain('/pokemons/25');
});

test('redireciona para os Details', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkDetails = getByText(/more details/i);
  userEvent.click(linkDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('Testa icone de estrela', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  const detailsLink = getByText(/more details/i);
  userEvent.click(detailsLink);
  const favoriteButton = getByText(/pokémon favoritado/i);
  userEvent.click(favoriteButton);
  const starIcon = getByAltText(/pikachu is marked as favorite/i);
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});