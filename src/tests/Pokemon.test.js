import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('É renderizado um card com as informações de determinado pokémon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    let name = getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
    const next = getByText(/Próximo pokémon/i);
    userEvent.click(next);
    name = getByText(/Charmander/i);
    expect(name).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    let name = getByText(/Pikachu/i);
    let gender = screen.getByTestId('pokemonType');
    expect(name).toBeInTheDocument();
    expect(gender).toHaveTextContent('Electric');
    const next = getByText(/Próximo pokémon/i);
    userEvent.click(next);
    name = getByText(/Charmander/i);
    gender = screen.getByTestId('pokemonType');
    expect(name).toBeInTheDocument();
    expect(gender).toHaveTextContent('Fire');
  });

  test('O peso médio do pokémon deve ser exibido com um texto...', () => {
    const { getByText } = renderWithRouter(<App />);
    const weight = screen.getByTestId('pokemon-weight');
    const measurement = getByText(/kg/i);
    expect(weight).toBeInTheDocument();
    expect(measurement).toBeInTheDocument();
  });

  test('é feito o redirecionamento da aplicação para a página de detalhes', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const favorite = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
