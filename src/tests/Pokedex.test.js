import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Verifica se a página contém um heading h2 "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2Text = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2Text).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo pokémon ao clicar no botão "Próximo pokémon"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const proximoPokemon = getByText(/Próximo pokémon/i);
    expect(proximoPokemon).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém o botão pra resetar o filtro', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/All/i));
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId, getAllByRole } = renderWithRouter(
      <App />,
    );
    const tiposNomes = 7;
    const botao = getAllByTestId('pokemon-type-button');
    expect(botao).toHaveLength(tiposNomes);
    const fire = getAllByRole('button', {
      name: /fire/i,
    });
    const psychic = getAllByRole('button', {
      name: /psychic/i,
    });
    const electric = getAllByRole('button', {
      name: /electric/i,
    });
    const normal = getAllByRole('button', {
      name: /normal/i,
    });
    expect(fire).toHaveLength(1);
    expect(psychic).toHaveLength(1);
    expect(electric).toHaveLength(1);
    expect(normal).toHaveLength(1);
  });
  const botaoAll = getByRole('button', {
    name: /all/i,
  });
  expect(botaoAll).toBeInTheDocument();
});
