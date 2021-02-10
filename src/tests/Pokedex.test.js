import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes no component Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(headingH2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista', () => {
    const { getByText } = renderWithRouter(<App />);
    const proximoPokemon = getByText(/Próximo pokémon/i);
    expect(proximoPokemon).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const caterpie = getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const ekans = getByText(/Ekans/i);
    expect(ekans).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const alakazam = getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const mew = getByText(/mew/i);
    expect(mew).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const rapidash = getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const snorlax = getByText(/Snorlax/i);
    expect(snorlax).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const dragonair = getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();

    userEvent.click(proximoPokemon);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByText } = renderWithRouter(<App />);
    const all = getByText(/All/i);
    const electric = screen.getAllByText(/Electric/i);
    const fire = getByText(/Fire/i);
    const bug = getByText(/Bug/i);
    const poison = getByText(/Poison/i);
    const psychic = getByText(/Psychic/i);
    const normal = getByText(/Normal/i);
    const dragon = getByText(/Dragon/i);

    expect(all).toBeInTheDocument();
    expect(electric[0]).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();

    userEvent.click(dragon);
    const dragonClick = screen.getAllByText(/Dragon/i);
    // expect(dragonClick).toHaveLength(3);
    expect(dragonClick[0]).toBeInTheDocument();
    expect(dragonClick[1]).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro All', () => {
    const { getByText } = renderWithRouter(<App />);
    const allBtn = getByText(/All/i);
    userEvent.click(allBtn);
    const allBtnCliked = getByText(/Pikachu/i);
    expect(allBtnCliked).toBeInTheDocument();
  });
});
