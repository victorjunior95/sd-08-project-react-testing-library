import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe('Req 6 - Pokemon Test', () => {
  test('1 - Shows a card with pokémon stats', () => {
    const { getByTestId, getAllByRole } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const weight = getByTestId('pokemon-weight');
    const img = getAllByRole('img')[0];

    const aveWeight = pikachu.averageWeight.value;
    const unit = pikachu.averageWeight.measurementUnit;

    expect(name.textContent).toBe(pikachu.name);
    expect(type.textContent).toBe(pikachu.type);
    expect(weight.textContent).toBe(`Average weight: ${aveWeight} ${unit}`);
    expect(img).toHaveAttribute('src', pikachu.image);
    expect(img).toHaveAttribute('alt', `${pikachu.name} sprite`);
  });

  test('2 - Test if card shows a link to pokémon details', () => {
    const { getByText } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const link = getByText(/More/i);
    expect(link).toHaveAttribute('href', `/pokemons/${pikachu.id}`);
  });
  test('3 - Shows pokémon details when click on link', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const link = getByText(/More/i);
    fireEvent.click(link);
    const title = getAllByRole('heading', { level: 2 })[0];
    expect(title.textContent).toBe(`${pikachu.name} Details`);
  });
  test('4 - Shows current URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const link = getByText(/More/i);
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pikachu.id}`);
  });
  test('5 - Shows a star in the favorited pokémons card ', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const link = getByText(/More/i);
    fireEvent.click(link);

    const favorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favorite);
    history.goBack();
    const img = getByAltText(`${pikachu.name} is marked as favorite`);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', `${pikachu.name} is marked as favorite`);
  });
});
