import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

describe('Requisito 6 <Pokemon.js />', () => {
  test('Testa se um card é renderizado com as informações de determinado pokemon.',
    () => {
      const { getByText, getByTestId, getByRole } = renderWithRouter(<Pokemon
        pokemon={ pokemons[4] }
        isFavorite={ false }
      />);
      const pokemonName = getByText(/alakazam/i);
      expect(pokemonName).toBeInTheDocument();

      const pokemontype = getByText(/psychic/i);
      expect(pokemontype).toBeInTheDocument();

      const { averageWeight: { value, measurementUnit }, name, image } = pokemons[4];

      const weight = getByTestId('pokemon-weight');
      expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

      const pokemonImage = getByRole('img', {
        name: /alakazam/i,
      });

      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
    });

  test('testa se o card indicado contém um link para a rota /pokemons/<id>',
    () => {
      const { getByRole } = renderWithRouter(<Pokemon
        pokemon={ pokemons[4] }
        isFavorite={ false }
      />);
      const { id } = pokemons[4];
      const link = getByRole('link', { name: /more details/i });

      expect(link).toHaveAttribute('href', `/pokemons/${id}`);
    });

  test('testa o redirecionamento da página através do link', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });

    userEvent.click(link);

    const title = getByText('Pikachu Details');
    expect(title).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[4] }
      isFavorite
    />);
    const { name } = pokemons[4];
    const icon = getByRole('img', { name: /alakazam is marked as favorite/i });
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
    expect(icon).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
