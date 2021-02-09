import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('É exibido na tela a mensagem No favorite pokemon found?', () => {
    const { container } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const paragafo = container.querySelector('p');
    expect(paragafo).toHaveTextContent(/No favorite pokemon found/i);
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    const pathnameD = history.location.pathname;
    expect(pathnameD).toBe('/pokemons/25');

    const favorito = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favorito);
    userEvent.click(getByRole('link', { name: /favorite pokémons/i }));
    const pathnameF = history.location.pathname;
    expect(pathnameF).toBe('/favorites');

    const img = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(img).toBeInTheDocument();
  });

  // it('Teste se nenhum card de pokémon é exibido', () => {
  //   const { getByRole } = renderWithRouter(<FavoritePokemons />);
  //   const img = getByRole('img', { name: /pikachu is marked as favorite/i });
  //   expect(img).toBe(null);
  // });
});
