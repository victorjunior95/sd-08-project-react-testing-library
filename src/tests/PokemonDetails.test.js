import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe('Req 7 - Pokemon Details Test', () => {
  test('1 - Shows Pokemon Name details', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const link = getByText(/More/i);
    fireEvent.click(link);

    const title = getAllByRole('heading', { level: 2 })[0];
    const summary = getAllByRole('heading', { level: 2 })[1];
    const paragraph = getByText(/This intelligent/i);

    expect(title.textContent).toBe(`${pikachu.name} Details`);
    expect(link).not.toBeInTheDocument();
    expect(summary.textContent).toBe('Summary');
    expect(paragraph).toBeInTheDocument();
  });
  test('2 - Shows Pokemon Location maps', () => {
    const { getByText, getAllByAltText, getAllByRole } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const link = getByText(/More/i);
    fireEvent.click(link);

    const mapa = getAllByRole('heading', { level: 2 })[2];
    const locations = getAllByAltText(`${pikachu.name} location`);
    const locName1 = getByText(pikachu.foundAt[0].location);
    const locName2 = getByText(pikachu.foundAt[1].location);

    expect(locations.length).toBe(pikachu.foundAt.length);
    expect(mapa.textContent).toBe(`Game Locations of ${pikachu.name}`);
    expect(locName1).toBeInTheDocument();
    expect(locName2).toBeInTheDocument();
    expect(locations[0]).toHaveAttribute('src', pikachu.foundAt[0].map);
    expect(locations[1]).toHaveAttribute('src', pikachu.foundAt[1].map);
    expect(locations[0]).toHaveAttribute('alt', `${pikachu.name} location`);
    expect(locations[1]).toHaveAttribute('alt', `${pikachu.name} location`);
  });
  test('3 - Test if user can favorite in this page', () => {
    const { getByText, getByAltText, getByLabelText } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const link = getByText(/More/i);
    fireEvent.click(link);

    const favorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favorite);
    const img = getByAltText(`${pikachu.name} is marked as favorite`);
    expect(img).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(img).not.toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
});
