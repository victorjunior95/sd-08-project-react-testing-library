import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import Button from '../components/Button';

const testPokemons = [
  { id: 1,
    name: 'Xablowski',
    image: 'xablau.png',
    type: 'Fire',
    averageWeight: { measurementUnit: 'kg', value: '800' },
    showDetailsLink: true,
    isFavorite: true,
  }, { id: 2,
    name: 'Xablingonest',
    image: 'xablingones.png',
    type: 'Water',
    averageWeight: { measurementUnit: 'kg', value: '8100' },
    showDetailsLink: true,
    isFavorite: true },
  { id: 3,
    name: 'Xangri-la',
    image: 'xangri-la.png',
    type: 'Water',
    averageWeight: { measurementUnit: 'kg', value: '8300' },
    showDetailsLink: true,
    isFavorite: true }];
describe('tests for Pokedex.js', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('tests if pokedex rendering is ok', () => {
    const {
      getByRole,
      getByTestId,
      getAllByTestId,
      getByText,
    } = renderWithRouter(
      <Pokedex
        pokemons={ testPokemons }
        isPokemonFavoriteById={ { 1: true, 2: true, 3: true } }
      />,
    );
    const title = getByRole(
      'heading', { level: 2, name: /Encountered pokémons/ },
    );
    const typeBtn = getAllByTestId('pokemon-type-button');
    const allBtn = getByText(/All/);
    const nextBtn = getByTestId(/next-pokemon/);
    expect(title).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(typeBtn).toHaveLength(2);
    expect(typeBtn[0]).toHaveTextContent(testPokemons[0].type);
    expect(typeBtn[1]).toHaveTextContent(testPokemons[1].type);
    expect(typeBtn[1]).toHaveTextContent(testPokemons[2].type);
    expect(nextBtn).toHaveTextContent(/Próximo pokémon/i);
  });

  it('verifies if filtering type is ok', () => {
    const {
      getByTestId,
      getAllByTestId,
      getByText,
    } = renderWithRouter(
      <Pokedex
        pokemons={ testPokemons }
        isPokemonFavoriteById={ { 1: true, 2: true, 3: true } }
      />,
    );
    const typeBtn = getAllByTestId('pokemon-type-button');
    const nextPk = getByTestId(/next-pokemon/);
    expect(typeBtn).toHaveLength(2);
    userEvent.click(typeBtn[0]);
    expect(getByText(testPokemons[0].name)).toBeInTheDocument();
    userEvent.click(nextPk);
    expect(getByText(testPokemons[0].name)).toBeInTheDocument();
    userEvent.click(typeBtn[1]);
    expect(getByText(testPokemons[1].name)).toBeInTheDocument();
    userEvent.click(nextPk);
    expect(getByText(testPokemons[2].name)).toBeInTheDocument();
    userEvent.click(getByText(/All/));
  });
});
