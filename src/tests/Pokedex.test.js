import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testa o componente Pokedex ', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading',
      {
        Level: 2,
        name: 'Encountered pokémons',
      });
    expect(headingH2).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(<App />);
      const nextButton = screen.getByRole('button',
        {
          name: 'Próximo pokémon',
        });
      const allButton = screen.getByText('All');

      userEvent.click(allButton);
      expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();

      pokemons.forEach((pokemon) => {
        const namePokemon = screen.getByText(pokemon.name);
        expect(namePokemon).toBeInTheDocument();
        userEvent.click(nextButton);
      });
    });

  test('se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const onePokemon = screen.getAllByTestId('pokemon-name');
    expect(onePokemon.length).toBe(1);
  });
});
test('se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const typeButton = screen.queryAllByTestId('pokemon-type-button');
  expect(typeButton[0].textContent).toBe('Electric');
});
test('o botão de Próximo pokémon deve ser desabilitado ....', () => {
  renderWithRouter(<App />);
  const btn = screen.getByRole('button', { name: 'Próximo pokémon',
  });
  const electricButton = screen.getByRole('button', { name: 'Electric' });
  userEvent.click(electricButton);
  expect(btn).toBeDisabled();
});
