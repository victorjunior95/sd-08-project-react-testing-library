import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

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

    // eslint-disable-next-line sonarjs/no-duplicate-string
    const paragraph = getByTestId('pokemon-name');
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
  it('próximo Pokémon da lista quando o botão `Próximo pokémon` é clicado', () => {
    const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);

    const button = getByText(/Próximo Pokémon/i);

    fireEvent.click(button);
    expect(getByRole('button', {
      name: /Próximo pokémon/,
    })).toBeInTheDocument();

    const paragraph1 = getByTestId('pokemon-name');
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph1).toHaveTextContent(/Charmander/i);

    fireEvent.click(button);
    const paragraph2 = getByTestId('pokemon-name');
    expect(paragraph2).toBeInTheDocument();
    expect(paragraph2).toHaveTextContent(/Caterpie/i);

    fireEvent.click(button);
    const paragraph3 = getByTestId('pokemon-name');
    expect(paragraph3).toBeInTheDocument();
    expect(paragraph3).toHaveTextContent(/Ekans/i);

    fireEvent.click(button);
    const paragraph4 = getByTestId('pokemon-name');
    expect(paragraph4).toBeInTheDocument();
    expect(paragraph4).toHaveTextContent(/Alakazam/i);
  });
});
