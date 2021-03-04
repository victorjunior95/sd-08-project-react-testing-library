import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testing component Pokedex', () => {
  it('Test: heading H2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedexHeading = getByRole('heading', {
      level: 2,
    });
    expect(pokedexHeading).toHaveTextContent('Encountered pokémons');
  });

  it('Test: show the next pokémon with the button "Próximo pokémon"', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const nextPokemonBtn = getByTestId('next-pokemon');
    expect(nextPokemonBtn).toHaveTextContent('Próximo pokémon');

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Charmander');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Caterpie');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Ekans');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Alakazam');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Mew');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Rapidash');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Snorlax');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Dragonair');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Pikachu');
  });

  it('Test: filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const seven = 7;

    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton, { target: 'All' });

    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(seven);

    const pokemon = screen.getByTestId('pokemon-name');
    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    const typeFireBtn = screen.getByText('Fire');
    const typePsychicBtn = screen.getByText('Psychic');

    fireEvent.click(typeFireBtn);
    expect(pokemon).toHaveTextContent('Charmander');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Rapidash');

    fireEvent.click(typePsychicBtn);
    expect(pokemon).toHaveTextContent('Alakazam');
    fireEvent.click(nextPokemonBtn);
    expect(pokemon).toHaveTextContent('Mew');
  });
});
