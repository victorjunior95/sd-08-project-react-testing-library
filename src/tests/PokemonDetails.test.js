import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  test('Testa informações do Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonDetails = screen.getByText(/More Details/i);
    userEvent.click(buttonDetails);
    const pokemonName = getByText('Pikachu Details');
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokemonDesc = screen.getByText(/This intelligent Pokémon roasts hard berries/i);

    expect(pokemonName).toHaveTextContent('Pikachu Details');
    expect(buttonDetails).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(pokemonDesc).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas dos pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);

    userEvent.click(buttonDetails);

    const pokemonLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game locations of Pikachu/i,
    });

    const pokeLocations = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });

    expect(pokemonLocation).toBeInTheDocument();
    expect(pokeLocations.length).toBe(2);
    expect(pokeLocations[0]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);

    userEvent.click(buttonDetails);

    const checkbox = screen.getByRole('checkbox');
    const label = getByText(/Pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(checkbox).toBeTruthy();
    expect(label).toBeInTheDocument();
  });
});
