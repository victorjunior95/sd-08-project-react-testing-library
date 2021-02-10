import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

it('Teste se é exibido na tela a mensagem'
+ 'No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
  render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const noFav = screen.getByRole('heading', {
    name: /favorite pokémons/i,
  });
  expect(noFav).toBeInTheDocument();
});

it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
  render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const noFav = screen.getByText(/no favorite pokemon found/i);
  expect(noFav).toBeInTheDocument();
});

it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkHome = screen.getByRole('link', {
    name: /home/i,
  });
  userEvent.click(linkHome);

  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(moreDetails);

  const btnFav = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(btnFav);

  const linkFav = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  userEvent.click(linkFav);
  const text = screen.getByText(/pikachu/i);
  expect(text).toBeInTheDocument();
});
