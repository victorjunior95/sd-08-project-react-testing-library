import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    const paragraph = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(paragraph).toBeInTheDocument();
  });
  it('o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const Charmander = getByText(/Charmander/i);
    expect(Charmander).toBeInTheDocument();
  });
  it('o próximo Pokémon da lista quando o botão Próximo pokémon é clicado2', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(button).toBeInTheDocument();
    const clickerButton = () => userEvent.click(button);
    for (let i = 0; i < pokemons.length; i += 1) {
      clickerButton();
    }
    const Pikachu = getByText(/Pikachu/i);
    expect(Pikachu).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(button).toBeInTheDocument();
    const clickerButton = () => userEvent.click(button);
    for (let i = 0; i < pokemons.length; i += 1) {
      clickerButton();
      const pokemon = getAllByRole('img');
      expect(pokemon).toHaveLength(1);
    //   expect(pokemon).toBeInTheDocument();
    }
  });

  it('should', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: 'Psychic'
    });

    userEvent.click(button);
        
    const filteredPokemons = pokemons
      .filter(
        ({type}) => type === 'Psychic'
      );

    const nextPokemon = getByRole('button', {
      name: 'Próximo pokémon'
    });

    expect.assertions(filteredPokemons.length);
    
    filteredPokemons.forEach(Pokemon => {
      const element = getByText(Pokemon.name);
      expect(element).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });
  });
});