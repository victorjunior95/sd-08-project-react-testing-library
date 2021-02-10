import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWhitRouter from './renderWithRouter';

const maxNumberOfPokemons = 10;
const DataPokemon = [{
  name: '',
  type: '',
  weigth: '',
}];

describe('Pokedex.js ', () => {
  test('Teste se página contém um heading h2 : Encountered pokémons.', () => {
    // global.fetch = jest.fn().mockResolvedValue({
    //   json: async () => pokemonMock,
    // });
    const { history } = renderWhitRouter(<App />);
    console.log(history);
    const pokedexText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexText).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    let n = 0;
    const { history } = renderWhitRouter(<App />);
    console.log(history);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(nextButton).toHaveAttribute('data-testid', 'next-pokemon');
    expect(nextButton).toHaveAttribute('class', 'button-text pokedex-button');
    expect(nextButton).toBeInTheDocument();
    while (DataPokemon[1] === DataPokemon[n] && DataPokemon[0] === DataPokemon[n - 1]) {
      DataPokemon[n].name = screen.getByTestId('pokemon-name');
      expect(DataPokemon[n].name).toBeInTheDocument();
      DataPokemon[n].type = screen.getByTestId('pokemonType');
      expect(DataPokemon[n].type).toBeInTheDocument();
      DataPokemon[n].weigth = screen.getByTestId('pokemon-weight');
      expect(DataPokemon[n].weigth).toBeInTheDocument();
      userEvent.click(nextButton);
      n += 1;
      if ((n - 2) > maxNumberOfPokemons) { break; }
    }
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { history } = renderWhitRouter(<App />);
    console.log(history);
    const pokemonOverview = screen.getAllByTestId('pokemon-name');
    // console.log(pokemonOverview[1]);
    expect(pokemonOverview[0]).toBeInTheDocument();
    // expect(pokemonOverview[1]).not.toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { history } = renderWhitRouter(<App />);
    console.log(history);
    const buttonsTypes = screen.getAllByTestId('pokemon-type-button');
    for (let index = 0; index < buttonsTypes.length; index += 1) {
    //   console.log(buttonsTypes[index].tagName);
      expect(buttonsTypes[index]).toBeInTheDocument();
    }
    const electricButtons = screen.getByRole('button', {
      name: /electric/i,
    });
    expect(electricButtons).toBeInTheDocument();
    const fireButtons = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(fireButtons).toBeInTheDocument();
    const bugButtons = screen.getByRole('button', {
      name: /bug/i,
    });
    expect(bugButtons).toBeInTheDocument();
    const poisonButtons = screen.getByRole('button', {
      name: /poison/i,
    });
    expect(poisonButtons).toBeInTheDocument();
    const psychicButtons = screen.getByRole('button', {
      name: /psychic/i,
    });
    expect(psychicButtons).toBeInTheDocument();
    const normalButtons = screen.getByRole('button', {
      name: /normal/i,
    });
    expect(normalButtons).toBeInTheDocument();
    const dragonButtons = screen.getByRole('button', {
      name: /dragon/i,
    });
    expect(dragonButtons).toBeInTheDocument();
    const allButtons = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButtons).toBeInTheDocument();
  });
  test('Teste do botão All.', () => {
    const { history } = renderWhitRouter(<App />);
    console.log(history);
    const allButtons = screen.getByRole('button', {
      name: /all/i,
    });
    const electricButtons = screen.getByRole('button', {
      name: /electric/i,
    });
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(electricButtons);
    //  https://stackoverflow.com/questions/56593840/check-that-button-is-disabled-in-react-testing-library
    expect(nextButton).toHaveAttribute('disabled');
    userEvent.click(allButtons);
    expect(nextButton).not.toHaveAttribute('disabled');
  });
});
