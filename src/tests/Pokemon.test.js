import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

describe('Requisito 6 <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const { getByText, getByTestId, getByRole } = renderWithRouter(<Pokemon
        pokemon={ pokemons[4] }
        isFavorite={ false }
      />);

      const pokeName = getByText(/alakazam/i);
      expect(pokeName).toBeInTheDocument();

      const type = getByText(/psychic/i);
      expect(type).toBeInTheDocument();

      const { averageWeight: { value, measurementUnit }, name } = pokemons[4];
      const weight = getByTestId('pokemon-weight');
      expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

      const image = getByRole('img', {
        name: /alakazam/i,
      });
      expect(image).toHaveProperty('alt', `${name} sprite`);
    });

  test('se o card indicado contém um link com url /pokemons/<id>',
    () => {
      const { getByRole } = renderWithRouter(<Pokemon
        pokemon={ pokemons[4] }
        isFavorite={ false }
      />);
      const { id } = pokemons[4];
      const cardLink = getByRole('link', { name: /more details/i });
      expect(cardLink).toHaveAttribute('href', `/pokemons/${id}`);
    });
  test('se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { getByRole, history, getByText } = renderWithRouter(<App />);
    const cardLink = getByRole('link', { name: /more details/i });

    fireEvent.click(cardLink);
    const { id } = pokemons[0];
    const { pathname } = history.location;
    const heading = getByText('Pikachu Details');

    expect(pathname).toEqual(`/pokemons/${id}`);
    expect(heading).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[4] }
      isFavorite
    />);
    const { name } = pokemons[4];
    const icone = getByRole('img', { name: /alakazam is marked as favorite/i });
    expect(icone).toHaveAttribute('src', '/star-icon.svg');
    expect(icone).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
