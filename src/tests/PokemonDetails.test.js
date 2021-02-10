import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

const btnType = 'pokemon-type-button';
const testids = ['pokemon-name', 'pokemonType', 'pokemon-weight'];

describe('details', () => {
  test('pikachu', () => {
    const history = createMemoryHistory();
    const pikachu = pokemons[0];
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.click(screen.getAllByTestId(btnType)[0]);
    userEvent.click(screen.getByText('More details'));
    expect(screen.getByTestId(testids[0]).textContent).toBe('Pikachu');
    expect(screen.getByTestId(testids[1]).textContent).toBe('Electric');
    expect(screen.getByTestId(testids[2]).textContent).toBe('Average weight: 6.0 kg');
    expect(screen.getByAltText(`${pikachu.name} sprite`)).toHaveProperty(
      'src',
      pikachu.image,
    );

    const h21 = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(h21).toBeInTheDocument();

    expect(screen.getByText(pikachu.summary)).toBeInTheDocument();

    const h22 = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pikachu.name}`,
    });
    expect(h22).toBeInTheDocument();

    const local = pikachu.foundAt;
    const lcal = screen.getAllByAltText(`${pikachu.name} location`);
    expect(lcal.length).toBe(2);

    expect(lcal[0].src).toBe(`${local[0].map}`);
    expect(lcal[1].src).toBe(`${local[1].map}`);

    expect(screen.getByText('Pokémon favoritado?')).toBeInTheDocument();

    const h23 = screen.getByRole('heading', {
      level: 2,
      name: `${pikachu.name} Details`,
    });
    expect(h23).toBeInTheDocument();
  });
});
