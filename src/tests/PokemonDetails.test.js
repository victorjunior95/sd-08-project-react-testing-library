import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('PokemonDetails.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByText('More details');
    fireEvent.click(linkMoreDetails);
  });

  it('deve mostrar informações detalhadas do pokemon', () => {
    const pokemonDetailsTitle = screen.getByText(/pikachu details/i);
    const linkMoreDetails = screen.queryByText(/more details/i);
    const pokemonSummary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    const paragraphAboutPokemon = screen.getByText(
      /this intelligent Pokémon roasts hard/i,
    );

    expect(pokemonDetailsTitle.textContent).toBe('Pikachu Details');
    expect(linkMoreDetails).toBeNull();
    expect(pokemonSummary).toBeInTheDocument();
    expect(paragraphAboutPokemon).toBeInTheDocument();
  });

  it('deve conter uma seção com mapas de sua localização', () => {
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /game Locations of pikachu/i,
    });
    const kantoCity = screen.getByText(/kanto power plant/i);
    const veridinForest = screen.getByText(/kanto viridian forest/i);
    const locations = screen.getAllByAltText(/pikachu location/i);

    expect(heading.textContent).toBe(`Game Locations of ${pokemonName.textContent}`);
    expect(kantoCity).toBeInTheDocument();
    expect(veridinForest.parentElement).toBeInTheDocument();
    expect(locations).toHaveLength(2);
    expect(locations[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(locations[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(locations[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('usuário deve conseguir favoritar um pokémon', () => {
    const checkboxLabel = screen.getByText('Pokémon favoritado?');
    fireEvent.click(checkboxLabel);

    const favoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    const checkbox = screen.getByRole(/checkbox/i);

    expect(checkboxLabel.textContent).toBe('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    expect(favoriteIcon).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
