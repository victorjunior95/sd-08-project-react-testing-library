import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando Pokedex', () => {
  test('Verificando <h2> Encountered pokémons', () => {
    renderWithRouter(<App />);
    const textPokemonInicial = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(textPokemonInicial).toBeInTheDocument();
  });

  test('Verificando <button> em Pokedex ', () => {
    renderWithRouter(<App />);
    const buttonProxPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonProxPokemon).toBeInTheDocument();
  });
  test('Verificando ordens dos pokemons', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    const buttonProxPokemon = getByText(/Próximo pokémon/i);
    const pokemonInScreen = getByText('Pikachu');

    expect(pokemonInScreen).toBeInTheDocument();

    fireEvent.click(buttonProxPokemon);

    expect(queryByText('Pikachu')).not.toBeInTheDocument();

    expect(pokemonInScreen).toBeInTheDocument();
  });

  test('Verificando de botoes filtro', () => {
    const { queryByText, getByText } = renderWithRouter(<App />);
    const btfiltroAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(btfiltroAll).toBeInTheDocument();

    const btfiltroPsychic = screen.getByRole('button', {
      name: /Psychic/i,
    });
    expect(btfiltroPsychic).toBeInTheDocument();

    const btfiltroFire = screen.getByRole('button', {
      name: /Fire/i,
    });
    expect(btfiltroFire).toBeInTheDocument();

    const buttonProxPokemon = getByText(/Próximo pokémon/i);
    expect(buttonProxPokemon).toBeInTheDocument();

    fireEvent.click(btfiltroPsychic);
    expect(btfiltroAll).toBeInTheDocument();
    expect(queryByText('Alakazam')).toBeInTheDocument();
    fireEvent.click(buttonProxPokemon);
    expect(queryByText('Alakazam')).not.toBeInTheDocument();
    expect(queryByText('Mew')).toBeInTheDocument();
    expect(btfiltroAll).toBeInTheDocument();
    fireEvent.click(btfiltroFire);
    expect(queryByText('Charmander')).toBeInTheDocument();
    expect(btfiltroAll).toBeInTheDocument();
    fireEvent.click(btfiltroAll);
    expect(queryByText('Mew')).not.toBeInTheDocument();
    expect(queryByText('Pikachu')).toBeInTheDocument();
  });
});
