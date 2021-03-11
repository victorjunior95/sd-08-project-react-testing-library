import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const details = 'More details';

test('Verifica mensagem card com as informações', () => {
  const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);

  const btnEletric = getByRole('button', {
    name: 'Electric',
  });

  fireEvent.click(btnEletric);

  const pokemonEletric = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const averageWeight = getByText('Average weight: 6.0 kg');
  const pokemonImg = getByRole('img', {
    name: 'Pikachu sprite',
  });

  expect(pokemonEletric.innerHTML).toBe('Pikachu');
  expect(pokemonType.innerHTML).toBe('Electric');
  expect(averageWeight).toBeInTheDocument();
  expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonImg.alt).toBe('Pikachu sprite');
});

test('Verifica se o card do Pokémon indicado na Pokédex contém link de navegação', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);

  const btnDragon = getByRole('button', {
    name: 'Dragon',
  });

  fireEvent.click(btnDragon);

  const linkDetails = getByText(details);

  expect(linkDetails.href).toBe('http://localhost/pokemons/148');
});

test('Verifica o redirecionamento da aplicação para a página de detalhes', () => {
  const { getByText, history, getByRole } = renderWithRouter(<App />);

  const btnDragon = getByRole('button', {
    name: 'Dragon',
  });

  fireEvent.click(btnDragon);

  const linkDetails = getByText(details);

  fireEvent.click(linkDetails);

  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/148');
});

test('Verifica se a URL exibida no navegador muda', () => {
  const { history, getByRole, getByText } = renderWithRouter(<App />);

  const btnPoison = getByRole('button', {
    name: 'Poison',
  });

  fireEvent.click(btnPoison);

  const linkDetails = getByText(details);

  fireEvent.click(linkDetails);

  const { pathname } = history.location;

  expect(pathname).not.toBe('/');
});

test('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
 
  const btnPoison = getByRole('button', {
    name: 'Poison',
  });

  fireEvent.click(btnPoison);

  const linkDetails = getByText(details);

  fireEvent.click(linkDetails);

  const favoritedPokemon = getByText('Pokémon favoritado?');

  fireEvent.click(favoritedPokemon);

  const favoritedEkans = getByRole('img', {
    name: 'Ekans is marked as favorite',
  });

  expect(favoritedEkans).toBeInTheDocument();
  expect(favoritedEkans.src).toBe('http://localhost/star-icon.svg');
});
