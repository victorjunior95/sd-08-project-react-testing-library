import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe('Req 3 - FavoritePokemons Test', () => {
  test('1 - Shows No favorite pokemon found if nobody is favorited', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    const favLink = getAllByRole('link')[2];
    fireEvent.click(favLink);
    const text = getByText(/No favorite/i);

    expect(text.textContent).toBe('No favorite pokemon found');
  });

  test('2 - Shows all favorite pokemons cards', () => {
    const { getAllByText, getByLabelText } = renderWithRouter(<App />);
    const { getAllByRole, getByAltText } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const link = getAllByText(/More/i)[0];
    fireEvent.click(link);
    const favorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favorite);
    const favLink = getAllByRole('link')[2];
    fireEvent.click(favLink);
    const img = getByAltText(`${pikachu.name} is marked as favorite`);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', `${pikachu.name} is marked as favorite`);
  });

  test('3 - All pokemons showed are favorite pokemons', () => {
    const { getAllByText, getAllByRole } = renderWithRouter(<App />);
    const { getByLabelText, getByText } = renderWithRouter(<App />);

    const expectValue = 4;
    const favLink = getAllByRole('link')[2];
    fireEvent.click(favLink);
    const imgs = getAllByRole('img');
    expect(imgs.length).toBe(expectValue);

    const link = getAllByText(/More/i)[0];
    fireEvent.click(link);
    const favorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favorite);
    fireEvent.click(favLink);

    const text = getByText(/No favorite/i);
    expect(text.textContent).toBe('No favorite pokemon found');
  });
});
