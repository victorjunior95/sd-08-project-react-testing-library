import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

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

  test('filtros existem', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const els = screen.getAllByTestId('pokemon-type-button');
    const count = 7;
    expect(els.length).toBe(count);
  });

  test('filtros electric', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const els = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(els[0]);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
