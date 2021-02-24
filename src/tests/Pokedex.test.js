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
  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId, getAllByRole, getByRole } = renderWithRouter(
      <App />,
    );
    const typesLength = 7;
    const button = getAllByTestId('pokemon-type-button');
    expect(button).toHaveLength(typesLength);
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
    const buttonAll = getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
  });
});
