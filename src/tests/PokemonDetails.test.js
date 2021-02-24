import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  it('Testa informações detalhadas do Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnDetails = screen.getByText(/More Details/i);
    userEvent.click(btnDetails);
    const pokemonName = getByText('Pikachu Details');
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokemonInfo = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(pokemonName).toHaveTextContent('Pikachu Details');
    expect(btnDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonInfo).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas dos pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnDetails = getByText(/More Details/i);
    userEvent.click(btnDetails);
    const pokemonGameLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game locations of Pikachu/i,
    });
    const pokeLocations = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(pokemonGameLocation).toBeInTheDocument();
    expect(pokeLocations.length).toBe(2);
    expect(pokeLocations[0]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnDetails = getByText(/More Details/i);
    userEvent.click(btnDetails);
    const checkbox = screen.getByRole('checkbox');
    const label = getByText(/Pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeTruthy();
    expect(label).toBeInTheDocument();
  });
});
