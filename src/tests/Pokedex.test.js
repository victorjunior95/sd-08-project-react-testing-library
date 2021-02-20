import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Req05 Teste Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
});

describe('Req05 Teste botão "Próximo pokémon" é clicado', () => {
  test('botão deve conter o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btnNext).toBeInTheDocument();
  });
  test('próximos Pokémons da lista devem ser mostrados, um a um, ao clicar', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(btnNext);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(btnNext);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });
  test('Teste filtrar pelos botões', () => {
    renderWithRouter(<App />);
    const btnFire = screen.getByRole('button', {
      name: /Fire/i,
    });
    expect(btnFire).toBeInTheDocument();
    userEvent.click(btnFire);
    const fireFilter = screen.getByText('Charmander');
    expect(fireFilter).toBeInTheDocument();
  });
  test('Teste se os botões de filtro existem', () => {
    renderWithRouter(<App />);
    const btnTypes = screen.getAllByTestId('pokemon-type-button');
    // console.log(btnTypes);
    const totalTypes = 7;
    expect(btnTypes.length).toBe(totalTypes);
  });

  test('Teste botão limpar filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(btnAll);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
