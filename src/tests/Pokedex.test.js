import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the <Pokedex.js /> component', () => {
  it('should have a h2 heading with text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', { name: 'Encountered pokémons' })).toBeInTheDocument();
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('should show the next pokemon when the button is clicked', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    expect(getByText(/Próximo pokémon/)).toBeInTheDocument();
    expect(getByRole('img', { name: 'Pikachu sprite' })).toBeInTheDocument();
    fireEvent.click(getByText(/Fire/));
    expect(getByRole('img', { name: 'Charmander sprite' })).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByRole('img', { name: 'Rapidash sprite' })).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByRole('img', { name: 'Charmander sprite' })).toBeInTheDocument();
  });

  it('should show only one pokemon at time', () => {
    const { getAllByText } = renderWithRouter(<App />);

    expect(getAllByText('More details')).toHaveLength(1);
  });

  it('should filter pokemons by types', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    expect(getByRole('img', { name: 'Pikachu sprite' })).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: 'Electric' }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    fireEvent.click(getByRole('button', { name: 'Fire' }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Fire');
    fireEvent.click(getByRole('button', { name: 'Bug' }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Bug');
    fireEvent.click(getByRole('button', { name: 'Poison' }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Poison');
    fireEvent.click(getByRole('button', { name: 'Psychic' }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');
    fireEvent.click(getByRole('button', { name: 'Normal' }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Normal');
    fireEvent.click(getByRole('button', { name: 'Dragon' }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Dragon');
  });

  it('should have a button to reset the filters', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);

    expect(getByRole('button', { name: 'All' })).toBeInTheDocument();
    const getName = getByTestId('pokemon-name');
    expect(getName).toHaveTextContent('Pikachu');
    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getName).toHaveTextContent('Charmander');
    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getName).toHaveTextContent('Caterpie');
    fireEvent.click(getByText(/Poison/));
    expect(getName).toHaveTextContent('Ekans');
    fireEvent.click(getByRole('button', { name: 'All' }));
    expect(getName).toHaveTextContent('Pikachu');
    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getName).toHaveTextContent('Charmander');
    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getName).toHaveTextContent('Caterpie');
  });

  it('should create the type buttons dynamically', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);

    const types = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    const typesNumber = types.length;
    expect(getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(getAllByTestId('pokemon-type-button')).toHaveLength(typesNumber);
    expect(getAllByTestId('')).toHaveLength(1);
  });

  it('should disable the "Next Pokémon" button when there is only one pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByRole('button', { name: 'Electric' }));
    expect(getByText(/Próximo pokémon/)).toHaveProperty('disabled');
    fireEvent.click(getByRole('button', { name: 'Bug' }));
    expect(getByText(/Próximo pokémon/)).toHaveProperty('disabled');
    fireEvent.click(getByRole('button', { name: 'Dragon' }));
    expect(getByText(/Próximo pokémon/)).toHaveProperty('disabled');
  });
});
