import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../mocks/pokemonDataMock01';
const isPokemonFavoriteMock = {
  25: false,
  4: false,
  65: false,
  143: false,
};
const btnType = 'pokemon-type-button';
describe('Pokedex', () => {
  test('title', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const el = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(el).toBeInTheDocument();
  });
  test('proximo', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/All/i));
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Próximo pokémon/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Ekans/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Alakazam/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Mew/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Rapidash/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Snorlax/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Dragonair/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });
  test('filtros', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const els = screen.getAllByTestId(btnType);
    const count = 7;
    expect(els.length).toBe(count);
    userEvent.click(els[0]);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    userEvent.click(els[1]);
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Rapidash/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(els[2]);
    expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();
    userEvent.click(els[3]);
    expect(screen.getByText(/Ekans/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Ekans/i)).toBeInTheDocument();
    userEvent.click(els[4]);
    expect(screen.getByText(/Alakazam/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Mew/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Alakazam/i)).toBeInTheDocument();
    userEvent.click(els[5]);
    expect(screen.getByText(/Snorlax/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Snorlax/i)).toBeInTheDocument();
    userEvent.click(els[6]);
    expect(screen.getByText(/Dragonair/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Dragonair/i)).toBeInTheDocument();
  });
  test('proximo desabilitado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const els = screen.getAllByTestId(btnType);
    userEvent.click(els[0]);
    expect(screen.getByText(/Próximo pokémon/i)).toHaveAttribute('disabled');
    userEvent.click(els[1]);
    expect(screen.getByText(/Próximo pokémon/i)).not.toHaveAttribute('disabled');
    userEvent.click(els[2]);
    expect(screen.getByText(/Próximo pokémon/i)).toHaveAttribute('disabled');
    userEvent.click(els[3]);
    expect(screen.getByText(/Próximo pokémon/i)).toHaveAttribute('disabled');
    userEvent.click(els[4]);
    expect(screen.getByText(/Próximo pokémon/i)).not.toHaveAttribute('disabled');
    userEvent.click(els[5]);
    expect(screen.getByText(/Próximo pokémon/i)).toHaveAttribute('disabled');
    userEvent.click(els[6]);
    expect(screen.getByText(/Próximo pokémon/i)).toHaveAttribute('disabled');
  });
  test('dinamico', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteMock } />
      </Router>,
    );
    const els = screen.getAllByTestId(btnType);
    const count = 4;
    expect(els.length).toBe(count);
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(els[0].textContent).toBe('Electric');
    expect(els[1].textContent).toBe('Fire');
    expect(els[2].textContent).toBe('Psychic');
    expect(els[3].textContent).toBe('Normal');
  });
});
