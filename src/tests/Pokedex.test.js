import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('checks if Pokedex component loads everything correctly', () => {
  test('tests if page has an h2 heading with the text Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('tests the next pokémon button', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText('Próximo pokémon');
    const buttonAll = getByText('All');

    fireEvent.click(buttonAll);
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Charmander/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Caterpie/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Ekans/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Alakazam/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Mew/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Rapidash/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Snorlax/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Dragonair/)).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(getByText(/Pikachu/)).toBeInTheDocument();
  });

  test('tests if only one pokémon is displayed', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('test filter buttons', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);
    const filterElectric = getByRole('button', { name: /electric/i });
    const filterFire = getByRole('button', { name: /fire/i });
    const filterBug = getByRole('button', { name: /bug/i });
    const filterPoison = getByRole('button', { name: /poison/i });
    const filterPsychic = getByRole('button', { name: /psychic/i });
    const filterNormal = getByRole('button', { name: /normal/i });
    const filterDragon = getByRole('button', { name: /dragon/i });
    const filterButtons = getAllByTestId('pokemon-type-button');
    const buttonsLength = filterButtons.length;

    expect(filterButtons.length).toBe(buttonsLength);

    fireEvent.click(filterElectric);
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    fireEvent.click(filterFire);
    expect(getByText(/Charmander/)).toBeInTheDocument();
    fireEvent.click(filterBug);
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    fireEvent.click(filterPoison);
    expect(getByText(/Ekans/)).toBeInTheDocument();
    fireEvent.click(filterPsychic);
    expect(getByText(/Alakazam/)).toBeInTheDocument();
    fireEvent.click(filterNormal);
    expect(getByText(/Snorlax/)).toBeInTheDocument();
    fireEvent.click(filterDragon);
    expect(getByText(/Dragonair/)).toBeInTheDocument();
  });
});
