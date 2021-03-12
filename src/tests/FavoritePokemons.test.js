import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const el = screen.getByText(/No favorite pokemon found/i);
    expect(el).toBeInTheDocument();
  });

  it('exibe favoritos', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkAll = screen.getByText(/All/i);
    expect(linkAll).toBeInTheDocument();
    userEvent.click(linkAll);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(screen.getByText(/More details/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/More details/i));
    userEvent.click(screen.getByText(/Pokémon favoritado?/i));
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Electric/i)).toBeInTheDocument();
  });
  test('exibe nenhum favorito', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkAll = screen.getByText(/All/i);
    expect(linkAll).toBeInTheDocument();
    userEvent.click(linkAll);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(screen.getByText(/More details/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/More details/i));
    userEvent.click(screen.getByText(/Pokémon favoritado?/i));
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const el = screen.getByText(/No favorite pokemon found/i);
    expect(el).toBeInTheDocument();
  });
});
