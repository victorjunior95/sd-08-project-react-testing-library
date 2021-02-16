import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste componente <FavoritePokemons.js />', () => {
  it('Exibe na tela mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavoitePokemons = getByText(/No favorite pokemon found/i);
    expect(noFavoitePokemons).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const favoritePokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];

    const history = createBrowserHistory();
    const { queryByText } = render(
      <Router history={ history }>
        <FavoritePokemons pokemons={ favoritePokemons } />
      </Router>,
    );
    expect(queryByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('Charmander')).toBeInTheDocument();
    expect(queryByText('Squirtle')).not.toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, senão estiver favoritado', () => {
    const { container } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    const noneFavoriteCard = container.querySelector('.favorite-pokemons');

    expect(noneFavoriteCard).toBe(null);
  });
});
