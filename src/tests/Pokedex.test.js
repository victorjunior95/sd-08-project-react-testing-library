import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes no componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      const { getByRole } = renderWithRouter(<App />);
      expect(getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      })).toBeInTheDocument();
    });

  it('Teste se exibi o próximo Pokémon da lista quando o botão  é clicado',
    () => {
      const { getByTestId } = renderWithRouter(<App />);
      const button = getByTestId('next-pokemon');
      fireEvent.click(button);
      const pokemon = getByTestId('pokemon-name');
      expect(pokemon).not.toHaveValue(pokemon);
    });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const pokemon = getAllByText('More details');
    expect(pokemon.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    const numeroDeButtons = 7;
    expect(buttons.length).toBe(numeroDeButtons);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonAll = getByText('All');
    fireEvent.click(buttonAll);
    const types1 = pokemons[0].type;
    const type2 = pokemons[1].type;
    expect(types1).not.toBe(type2);
    expect(buttonAll).toBeInTheDocument();
  });

  it('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon',
    () => {
      const { getByRole } = renderWithRouter(<App />);
      const btnEletric = getByRole('button', { name: pokemons[0].type });
      expect(btnEletric).toBeInTheDocument();

      const btnFire = getByRole('button', { name: pokemons[1].type });
      expect(btnFire).toBeInTheDocument();

      const btnBug = getByRole('button', { name: pokemons[2].type });
      expect(btnBug).toBeInTheDocument();

      const btnPoison = getByRole('button', { name: pokemons[3].type });
      expect(btnPoison).toBeInTheDocument();

      const btnPsychic = getByRole('button', { name: pokemons[4].type });
      expect(btnPsychic).toBeInTheDocument();

      const btnNormal = getByRole('button', { name: pokemons[7].type });
      expect(btnNormal).toBeInTheDocument();

      const btnDragon = getByRole('button', { name: pokemons[8].type });
      expect(btnDragon).toBeInTheDocument();

      const btnAll = getByRole('button', { name: 'All' });
      expect(btnAll).toBeInTheDocument();

      const btnProximoPokemon = getByRole('button', { name: 'Próximo pokémon' });
      fireEvent.click(btnEletric);
      expect(btnProximoPokemon).toHaveAttribute('disabled');
      fireEvent.click(btnBug);
      expect(btnProximoPokemon).toHaveAttribute('disabled');
      fireEvent.click(btnPoison);
      expect(btnProximoPokemon).toHaveAttribute('disabled');
      fireEvent.click(btnNormal);
      expect(btnProximoPokemon).toHaveAttribute('disabled');
      fireEvent.click(btnDragon);
      expect(btnProximoPokemon).toHaveAttribute('disabled');
    });
});
