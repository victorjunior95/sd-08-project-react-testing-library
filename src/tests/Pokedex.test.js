import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import favorites from './favorites';

describe('Pokedex.js test', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ favorites } isPokemonFavoriteById={ false } />,
    );
    const heading = getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ favorites } isPokemonFavoriteById={ false } />,
    );
    const button = getByText(/Próximo pokémon/i);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    userEvent.click(button);

    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(button);
    expect(pikachu).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ favorites } isPokemonFavoriteById={ false } />,
    );
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const button = getByText(/fire/i);
    userEvent.click(button);

    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ favorites } isPokemonFavoriteById={ false } />,
    );
    const buttonAll = getByText(/All/i);
    const buttonFire = getByText(/fire/i);

    userEvent.click(buttonFire);

    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  it('se há um botão de filtro para cada tipo de Pokémon.', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ favorites } isPokemonFavoriteById={ false } />,
    );
    const buttonEletric = getByRole('button', {
      name: /Electric/i,
    });
    const buttonFire = getByText(/fire/i);

    expect(buttonFire).toBeInTheDocument();
    expect(buttonEletric).toBeInTheDocument();
  });
  it('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ favorites } isPokemonFavoriteById={ false } />,
    );
    const buttonFire = getByText(/fire/i);
    userEvent.click(buttonFire);

    const buttonNext = getByText(/próximo pokémon/i);
    expect(buttonNext).toBeDisabled();

    const allbutons = getAllByTestId('pokemon-type-button');
    expect(allbutons.length).toBe(2);
  });
});
