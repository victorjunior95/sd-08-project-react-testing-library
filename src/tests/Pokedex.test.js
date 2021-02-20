import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Pokedex.js', () => {
  test('Teste se página contem um h2 especificado', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encountered = getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(encountered).toBeInTheDocument();
  });

  test(
    'Testa se é exibido através do botão "próximo pokemon", (tipo fire)', () => {
      const { getByRole, getByText } = renderWithRouter(<App />);
      const fireBtn = getByRole('button', { name: 'Fire' });
      expect(fireBtn).toBeInTheDocument();
      userEvent.click(fireBtn);
      expect(getByText('Charmander')).not.toBeNull();
      const nextBtn = getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(nextBtn);
      expect(getByText('Rapidash')).toBeInTheDocument();
      userEvent.click(nextBtn);
      expect(getByText('Charmander')).not.toBeNull();
    },
  );

  test('Testa se é exibido os pokemons no All', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    const allBtn = getByRole('button', { name: 'All' });
    expect(allBtn).toBeEnabled();
    const nextBtn = getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);
    expect(getByText('Charmander')).not.toBeNull();
    userEvent.click(nextBtn);
    expect(getByText('Caterpie')).not.toBeNull();
  });

  test('Testa se há botões de filtro por tipo', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const allBtn = getByRole('button', { name: /All/i });
    expect(allBtn).toBeEnabled();
    const nextBtn = getByRole('button', { name: /próximo pokémon/i });
    const electricBtn = getByRole('button', { name: 'Electric' });
    expect(electricBtn).toBeInTheDocument();
    userEvent.click(electricBtn);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    const fireBtn = getByRole('button', { name: 'Fire' });
    userEvent.click(fireBtn);
    expect(getByText('Charmander')).toBeInTheDocument();
    expect(nextBtn).toBeEnabled();

    const bugBtn = getByRole('button', { name: 'Bug' });
    userEvent.click(bugBtn);
    expect(getByText('Caterpie')).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    const poisonBtn = getByRole('button', { name: 'Poison' });
    userEvent.click(poisonBtn);
    expect(getByText('Ekans')).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    const psychicBtn = getByRole('button', { name: 'Psychic' });
    userEvent.click(psychicBtn);
    expect(getByText('Alakazam')).toBeInTheDocument();
    expect(nextBtn).toBeEnabled();

    const normalBtn = getByRole('button', { name: 'Normal' });
    userEvent.click(normalBtn);
    expect(getByText('Snorlax')).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    const dragonBtn = getByRole('button', { name: 'Dragon' });
    userEvent.click(dragonBtn);
    expect(getByText('Dragonair')).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    userEvent.click(allBtn);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Verificando o cumprimento dos botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const allTypeBtn = getAllByTestId('pokemon-type-button');
    const num = 7;
    expect(allTypeBtn.length).toBe(num);
  });
});
