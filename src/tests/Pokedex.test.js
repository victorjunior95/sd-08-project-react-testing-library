import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const POKEMON_NAME = 'pokemon-name';

describe('Teste o componente `<Pokedex.js />', () => {
  test('um heading `h2` com o texto `Encountered pokémons`.', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });
  it('próximo Pokémon da lista quando o botão `Próximo pokémon` é clicado', () => {
    const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);

    const button = getByText(/Próximo Pokémon/i);

    fireEvent.click(button);
    expect(getByRole('button', {
      name: /Próximo pokémon/,
    })).toBeInTheDocument();

    const paragraph = getByTestId(POKEMON_NAME);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(/Charmander/i);
  });
  it('botão com o texto `Próximo pokémon`', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const button = getByText(/Próximo Pokémon/i);

    fireEvent.click(button);
    expect(getByRole('button', {
      name: /Próximo pokémon/,
    })).toBeInTheDocument();
  });
  it('próximo Pokémon da lista um a um, e se dps do ultimo vem pikachu', () => {
    const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);

    const button = getByText(/Próximo Pokémon/i);

    fireEvent.click(button);
    expect(getByRole('button', {
      name: /Próximo pokémon/,
    })).toBeInTheDocument();

    const paragraph1 = getByTestId(POKEMON_NAME);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph1).toHaveTextContent(/Charmander/i);

    fireEvent.click(button);
    const paragraph2 = getByTestId(POKEMON_NAME);
    expect(paragraph2).toBeInTheDocument();
    expect(paragraph2).toHaveTextContent(/Caterpie/i);

    fireEvent.click(button);
    const paragraph3 = getByTestId(POKEMON_NAME);
    expect(paragraph3).toBeInTheDocument();
    expect(paragraph3).toHaveTextContent(/Ekans/i);

    fireEvent.click(button);
    const paragraph4 = getByTestId(POKEMON_NAME);
    expect(paragraph4).toBeInTheDocument();
    expect(paragraph4).toHaveTextContent(/Alakazam/i);

    fireEvent.click(button);
    const paragraph5 = getByTestId(POKEMON_NAME);
    expect(paragraph5).toBeInTheDocument();
    expect(paragraph5).toHaveTextContent(/Mew/i);

    fireEvent.click(button);
    const paragraph6 = getByTestId(POKEMON_NAME);
    expect(paragraph6).toBeInTheDocument();
    expect(paragraph6).toHaveTextContent(/Rapidash/i);

    fireEvent.click(button);
    const paragraph7 = getByTestId(POKEMON_NAME);
    expect(paragraph7).toBeInTheDocument();
    expect(paragraph7).toHaveTextContent(/Snorlax/i);

    fireEvent.click(button);
    const paragraph8 = getByTestId(POKEMON_NAME);
    expect(paragraph8).toBeInTheDocument();
    expect(paragraph8).toHaveTextContent(/Dragonair/i);

    fireEvent.click(button);
    const paragraph9 = getByTestId(POKEMON_NAME);
    expect(paragraph9).toBeInTheDocument();
    expect(paragraph9).toHaveTextContent(/Pikachu/i);
  });
  it('Pokédex tem os botões de filtro', () => {
    const { getByRole, getAllByTestId, getByText } = renderWithRouter(<App />);

    const SEVEN = 7;

    const buttonFilter = getAllByTestId('pokemon-type-button');

    expect(buttonFilter.length).toBe(SEVEN);

    expect(getByRole('button', {
      name: /Electric/i,
    })).toBeInTheDocument();

    const All = getByText('All');
    const Fire = getByText('Fire');
    const bug = getByText('Bug');
    const poison = getByText('Poison');
    const psychic = getByText('Psychic');
    const normal = getByText('Normal');
    const dragon = getByText('Dragon');

    expect(All).toBeInTheDocument();
    expect(Fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();

    fireEvent.click(All);
    fireEvent.click(Fire);
    fireEvent.click(bug);
    fireEvent.click(poison);
    fireEvent.click(psychic);
    fireEvent.click(normal);
    fireEvent.click(dragon);
  });
});
