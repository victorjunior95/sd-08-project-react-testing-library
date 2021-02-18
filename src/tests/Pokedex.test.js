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
  it('próximo Pokémon da lista um a um', () => {
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
  });
});
