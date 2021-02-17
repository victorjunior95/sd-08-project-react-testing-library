import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste componete <Pokedex.js>', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const headingText = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(headingText).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão clicado', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const firstPokemon = getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const buttonText = getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(buttonText);
    const secondePokemon = getByText(/charmander/i);

    expect(secondePokemon).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const filterButton = getAllByTestId('pokemon-type-button');
    const numberOfFilterButton = 7;
    expect(filterButton).toHaveLength(numberOfFilterButton);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);

    const allButton = getByRole('button', { name: /all/i });

    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
  });

  it('Teste se é criado, dinamico, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('button', { name: /Electric/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /fire/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Bug/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Poison/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Psychic/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Normal/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Dragon/i })).toBeInTheDocument();
  });

  it('O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada', () => {
    const { getByRole } = renderWithRouter(<App />);

    const filterButton = getByRole('button', { name: /dragon/i });
    userEvent.click(filterButton);
    const nextPokemon = getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemon.disabled).toBeTruthy();
  });
});
