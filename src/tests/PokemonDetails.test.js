import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do componente PokemonDetails', () => {
  test('verifica se link de detalhes funciona', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('verifica se o nome do pokemon renderiza', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(/pikachu/i);
  });
  test('verifica o cabeçalho', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const pikachuHeader = getByRole('heading', {
      level: 2, name: /pikachu details/i,
    });
    expect(pikachuHeader).toBeInTheDocument();
  });
  test('verifica se o cabeçalho "summary" renderiza', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const summaryHeader = getByRole('heading', {
      level: 2, name: /summary/i,
    });
    expect(summaryHeader).toBeInTheDocument();
  });
  test('verifica se o cabeçalho de localizações renderiza', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const locationsHeader = getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(locationsHeader).toBeInTheDocument();
  });
  test('verifica se o primeiro mapa aparece com atributos corretos', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const locationMaps = getAllByRole('img', { name: /pikachu location/i });
    expect(locationMaps.length).toBe(2);
    expect(locationMaps[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationMaps[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationMaps[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationMaps[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
