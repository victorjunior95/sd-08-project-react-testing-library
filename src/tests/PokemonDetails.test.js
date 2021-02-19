import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const Pikachu = pokemons[0];
const MORE_DETAILS = 'More details';

describe('Pokemon Detail page', () => {
  it('should display the pokemon information`', () => {
    const { container } = renderWithRouter(<App />);
    const pokemonDetailPage = screen.getByText(MORE_DETAILS);
    fireEvent.click(pokemonDetailPage);

    expect(pokemonDetailPage).not.toBeInTheDocument();
    const pokemonDetail = screen.getByText('Pikachu Details');
    expect(pokemonDetail).toBeInTheDocument();
    const summary = screen.getAllByRole('heading', { level: 2 })[1];
    expect(summary.textContent).toBe(' Summary ');
    const pokemonSummary = container.querySelectorAll('p')[3];
    expect(pokemonSummary.textContent).toBe('This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.');
  });
  it('should have a section with the pokemon locations`', () => {
    const { container } = renderWithRouter(<App />);
    const pokemonDetailPage = screen.getByText(MORE_DETAILS);
    fireEvent.click(pokemonDetailPage);

    const heading = screen.getAllByRole('heading', { level: 2 })[2];
    expect(heading.textContent).toBe('Game Locations of Pikachu');
    const pokemonLocations = container.querySelectorAll('em');
    expect(Pikachu.foundAt.length).toBe(pokemonLocations.length);
    const img = screen.getAllByRole('img')[1];
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img).toHaveAttribute('alt', 'Pikachu location');
  });
  it('should let the user favorite the pokemon`', () => {
    renderWithRouter(<App />);
    const pokemonDetailPage = screen.getByText(MORE_DETAILS);
    fireEvent.click(pokemonDetailPage);

    const input = screen.getByLabelText('Pokémon favoritado?');
    expect(input).toHaveAttribute('type', 'checkbox');
  });
});
