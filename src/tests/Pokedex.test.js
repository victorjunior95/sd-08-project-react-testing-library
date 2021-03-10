import React from 'react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources };
};

test('renders a heading with the text Encountered pokémons', () => {
  const { getByText } = renderPath('/');
  const heading = getByText(/Encountered pokémons/i);
  expect(heading).toBeInTheDocument();
});

test('renders a button with the text Próximo pokémon', () => {
  const { getByText } = renderPath('/');
  const buttonNextPkemon = getByText(/Próximo pokémon/i);
  expect(buttonNextPkemon).toBeInTheDocument();
});

test('renders a button with the text All', () => {
  const { getByText } = renderPath('/');
  const buttonAll = getByText(/All/i);
  expect(buttonAll).toBeInTheDocument();
});

test('test if is created dynamically a filter for each type of pokemon', () => {
  const { getAllByTestId, getByTestId } = renderPath('/');
  const typeButtons = getAllByTestId('pokemon-type-button');

  const pokemonsForTest = pokemons.filter((cada) => cada.name !== 'Mew')
    .filter(((cada) => cada.name !== 'Rapidash'));

  typeButtons.forEach((button, index) => {
    const pokemonType = button.textContent;
    userEvent.click(button);
    expect(getByTestId('pokemon-name').textContent).toBe(pokemonsForTest[index].name);
    expect(getByTestId('pokemonType').textContent).toBe(pokemonType);
  });
});

test('test if there is a button who reset filter', () => {
  const { getByText, getByTestId } = renderPath('/');
  const buttonAll = getByText('All');
  userEvent.click(buttonAll);
  expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
});
