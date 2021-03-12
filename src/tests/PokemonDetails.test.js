import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const testPokemon = pokemons[0];
const moreDetails = 'More details';

test('Teste as informações detalhadas do Pokémon', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);

  fireEvent.click(getByText('All'));
  expect(getByText(testPokemon.name)).toBeInTheDocument();
  fireEvent.click(getByText(moreDetails));
  expect(getByText(`${testPokemon.name} Details`)).toBeInTheDocument();
  expect(getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
  expect(getByText(testPokemon.summary)).toBeInTheDocument();
});

test('Teste se existe na página uma seção com os mapas', () => {
  const { getByText, getAllByAltText, getByRole } = renderWithRouter(<App />);

  fireEvent.click(getByText('All'));
  expect(getByText(testPokemon.name)).toBeInTheDocument();
  fireEvent.click(getByText(moreDetails));
  expect(getByRole('heading', { name: `Game Locations of ${testPokemon.name}` }))
    .toBeInTheDocument();

  expect(getAllByAltText(`${testPokemon.name} location`).length)
    .toBe(testPokemon.foundAt.length);
  for (let index = 0; index < testPokemon.foundAt.length; index += 1) {
    expect(getByText(testPokemon.foundAt[index].location)).toBeInTheDocument();
    expect(getAllByAltText(`${testPokemon.name} location`)[index].src)
      .toBe(testPokemon.foundAt[index].map);
  }
});

test('Teste se o usuário pode favoritar um pokémon', () => {
  const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
  const checkboxName = 'Pokémon favoritado?';
  const imgN = 4;

  fireEvent.click(getByText('All'));
  expect(getByText(testPokemon.name)).toBeInTheDocument();
  fireEvent.click(getByText(moreDetails));
  expect(getByRole('checkbox', { name: checkboxName })).toBeInTheDocument();
  fireEvent.click(getByRole('checkbox', { name: checkboxName }));
  expect(getAllByRole('img').length).toBe(imgN);
  fireEvent.click(getByRole('checkbox', { name: checkboxName }));
  expect(getAllByRole('img').length).toBe(imgN - 1);
});
