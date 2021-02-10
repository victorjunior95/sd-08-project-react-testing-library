import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

import data from './mock/pokemons';

describe('o componente <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, queryByText, getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite={ false }
      />,
    );

    const pikachu = getByText(/Pikachu/i);
    const pokemonType = queryByText(/Electric/i);
    const weight = getByText(/Average weight: 6.0 kg/i);
    const pokemonImg = getByRole('img', { name: /pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('se o URL /pokemons/<id>, onde <id> é o id do Pokémon exibido', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite={ false }
      />,
    );

    const details = getByText(/More details/i);
    expect(details).toHaveAttribute('href', '/pokemons/25');
  });

  test('se é feito o redirecionamento a página de detalhes de Pokémon.', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const { pathname } = history.location;

    const pokemonDetails = getByText(/pikachu details/i);
    expect(pokemonDetails).toBeDefined();
    expect(pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite
      />,
    );
    const pokemonFavorite = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(pokemonFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
