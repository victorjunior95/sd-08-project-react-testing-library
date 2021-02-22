import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';


it('Check if the text `Encountered pokémons` exist in the document', () => {
  const { getByText } = renderWithRouter(<App />);
  const text = getByText('Encountered pokémons');
  expect(text).toBeInTheDocument();
});

it('Check if the button `Próximo pokémon` exist in the document', () => {
  const { getByText } = renderWithRouter(<App />);
  const button = getByText(/Próximo pokémon/i);
  expect(button).toBeInTheDocument();
});

it('Check quatited take from id', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pockemons = getAllByTestId('pokemon-name');
  expect(pockemons.length).toBe(1);
});

it('Check the function of buttons of type pokemons', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const buttons = getAllByTestId('pokemon-type-button');
  buttons.forEach((eachButton) => {
    const bottonTypeOfPokemon = eachButton.textContent;
    const nextButton = getByTestId('next-pokemon');
    userEvent.click(eachButton);
    expect(getByTestId('pokemonType').textContent).toBe(bottonTypeOfPokemon);
    userEvent.click(nextButton);
  });
});

it('Check if button all exist in the document', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText('All');
  expect(buttonAll).toBeInTheDocument();
});

it('', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const buttonAll = getByText('All');
  userEvent.click(buttonAll);
  expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
});
