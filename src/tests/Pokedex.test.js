import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste Requisito 5', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    }));
  });

  test('Teste se é exibido os Pokémons quando o botão Próximo pokémon é clicado', () => {
    const { getByText } = renderWithRouter(<App />);

    const button = getByText('Próximo pokémon');
    userEvent.click(button);
    expect(getByText('Charmander')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Caterpie')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Ekans')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Alakazam')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Mew')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Rapidash')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Snorlax')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Dragonair')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getByRole } = renderWithRouter(<App />);

    const img = getByRole('img');
    expect(img.src).toContain('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).not.toContain('Charmander sprite');
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByText, getByRole } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Electric' }));
    expect(getAllByText('Electric'));
    userEvent.click(getByRole('button', { name: 'Fire' }));
    expect(getAllByText('Fire'));
    userEvent.click(getByRole('button', { name: 'Bug' }));
    expect(getAllByText('Bug'));
    userEvent.click(getByRole('button', { name: 'Poison' }));
    expect(getAllByText('Poison'));
    userEvent.click(getByRole('button', { name: 'Psychic' }));
    expect(getAllByText('Psychic'));
    userEvent.click(getByRole('button', { name: 'Normal' }));
    expect(getAllByText('Normal'));
    userEvent.click(getByRole('button', { name: 'Dragon' }));
    expect(getAllByText('Dragon'));
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'All' }));
    expect(getByText('Pikachu')).toBeInTheDocument();

    history.push('/');
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste se é criado um botão de filtro para cada tipo de Pokémon', () => {
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Fire' }));
    expect(getByText('Charmander')).toBeInTheDocument();
    userEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Rapidash')).toBeInTheDocument();

    const typeLength = 7;
    const type = getAllByTestId('pokemon-type-button');
    expect(type.length).toBe(typeLength);
  });
});
