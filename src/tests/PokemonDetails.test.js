import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7, PokemonDetails.js', () => {
  test('Detailed infomation should be displayed', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    const detailsTitle = getByRole('heading', { name: /pikachu details/i, level: 2 });
    const summary = getByRole('heading', { name: 'Summary', level: 2 });
    const text = getByText(pokemons[0].summary);
    expect(detailsTitle).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  test('Location should be properly displayed', () => {
    const { getByRole, queryAllByAltText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    const titleLocation = getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    const locations = document.querySelectorAll('em');
    const locationsImage = queryAllByAltText(/pikachu location/i);
    const LOCATION_1 = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const LOCATION_2 = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(titleLocation).toBeInTheDocument();
    expect(locations.length).toBe(2);
    expect(locationsImage[0]).toBeInTheDocument();
    expect(locationsImage[1]).toBeInTheDocument();
    expect(locationsImage[0].src).toBe(LOCATION_1);
    expect(locationsImage[1].src).toBe(LOCATION_2);
  });
  test('The user should be able to liked a pokemon', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    const checkbox = getByRole('checkbox');
    const labelText = getByLabelText(/pokémon favoritado?/i);
    expect(labelText).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);

  });
});
