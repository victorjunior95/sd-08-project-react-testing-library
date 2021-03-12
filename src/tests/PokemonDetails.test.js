import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../../../git/sd-08-project-react-testing-library/src/helper/renderWithRouter';
import App from '../../../git/sd-08-project-react-testing-library/src/App';
import data from '../../../git/sd-08-project-react-testing-library/src/data';

describe('Teste component PokemonDetails', () => {
  it(`Teste se as informações detalhadas do Pokémon selecionado são
    mostradas na tela.`, () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetails = screen.getByText('More details');
    userEvent.click(pokemonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const detailsPokeName = screen.getByText(/Pikachu Details/i);
    const summary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    const summaryParagraph = screen.getByText(data[0].summary);
    expect(detailsPokeName).toBeInTheDocument();
    expect(pokemonDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();

    const gameLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();

    const pokeHabitat = screen.getAllByRole('img');
    expect(pokeHabitat[0].src).toBe(data[0].image);
    expect(pokeHabitat[1].src).toBe(data[0].foundAt[0].map);
    expect(pokeHabitat[1].alt).toBe(`${data[0].name} location`);
    expect(pokeHabitat[2].alt).toBe(`${data[0].name} location`);
    expect(pokeHabitat[2].src).toBe(data[0].foundAt[1].map);
    const location1 = screen.getByText('Kanto Viridian Forest');
    const location2 = screen.getByText('Kanto Power Plant');
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    const favPokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(favPokemon).toBeInTheDocument();
    expect(favPokemon.checked).toBeFalsy();
    userEvent.click(favPokemon);
    expect(favPokemon.checked).toBeTruthy();
    userEvent.click(favPokemon);
    expect(favPokemon.checked).toBeFalsy();
  });
});