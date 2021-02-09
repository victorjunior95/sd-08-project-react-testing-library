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
  });
});
