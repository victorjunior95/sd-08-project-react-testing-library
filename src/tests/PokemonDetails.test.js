import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes no component Pokedex.js', () => {
  test('Informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const detailsTitle = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(detailsTitle).toBeInTheDocument();
    const headingSummary = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(headingSummary).toBeInTheDocument();
    const detailsText = screen.getByText(/This intelligent/i);
    expect(detailsText).toBeInTheDocument();
  });

  test('Seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const gameLocations = screen.getByRole('heading', {
      name: /Game locations/i,
      level: 2,
    });
    expect(gameLocations).toBeInTheDocument();
    const viridianForest = screen.getByText(/Viridian Forest/i);
    const powerPlant = screen.getByText(/Power plant/i);
    expect(viridianForest).toBeInTheDocument();
    expect(powerPlant).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[1]).toContainHTML('location');
    expect(images[2]).toContainHTML('location');
  });

  test('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const labelFavorite = screen.getByText(/Pokémon favoritado?/i);
    expect(labelFavorite).toBeInTheDocument();
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    const imgFavorite = screen.getAllByRole('img');
    expect(imgFavorite[1].src).toContain('/star-icon.svg');
    expect(favorite.checked).toBeTruthy();
    userEvent.click(favorite);
    expect(favorite.checked).toBeFalsy();
  });
});
