import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const next = 'Próximo pokémon';
const pokeName = 'pokemon-name';

describe('Testa o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByText(next);
    const pokemonName = screen.getByTestId(pokeName);
    expect(pokemonName).toHaveTextContent('Pikachu');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Charmander');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Caterpie');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Ekans');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Alakazam');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Mew');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Rapidash');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Snorlax');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Dragonair');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByText(next);
    const pokemonName = screen.getByTestId(pokeName);
    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    const btnLength = 7;
    expect(btnFilter.length).toBe(btnLength);

    const btnFilterFire = screen.getByRole('button', {
      name: /Fire/i,
    });
    const btnFilterPsychic = screen.getByRole('button', {
      name: /Psychic/i,
    });
    userEvent.click(btnFilterFire);
    expect(pokemonName).toHaveTextContent('Charmander');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Rapidash');
    userEvent.click(btnFilterPsychic);
    expect(pokemonName).toHaveTextContent('Alakazam');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Mew');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnAll = getByRole('button', {
      name: /All/i,
    });
    const pokemonName = screen.getByTestId(pokeName);
    userEvent.click(btnAll);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
