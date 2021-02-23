import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('test the Pokedex component', () => {
  it('Has all the required elements', () => {
    const history = createMemoryHistory();
    history.push('/');
    const { getByRole, getByTestId, getAllByTestId, getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const heading = getByRole('heading', { level: 2 });
    const button = getByTestId('next-pokemon');
    const allButton = getByText('All');
    const filterButtons = getAllByTestId('pokemon-type-button');
    const children = filterButtons.map((child) => child.innerHTML);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const NUMBERS = 7;

    expect(children).toEqual(types);
    expect(heading.textContent).toMatch('Encountered pokémons');
    expect(button.textContent).toMatch('Próximo pokémon');
    expect(filterButtons.length).toBe(NUMBERS);
    expect(allButton).toBeInTheDocument();
  });

  it('the elements have the expexted functionality', () => {
    const history = createMemoryHistory();
    history.push('/');
    const { getByText, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokemon = getByTestId('pokemon-name');
    const button = getByTestId('next-pokemon');
    const allButton = getByText('All');
    fireEvent.click(button);
    expect(pokemon.innerHTML).toBe('Charmander');
    fireEvent.click(allButton);
    expect(pokemon.innerHTML).toBe('Pikachu');
  });
});
