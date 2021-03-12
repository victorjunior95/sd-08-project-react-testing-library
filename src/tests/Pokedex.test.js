import React from 'react';
import { Router } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
// import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';

const isPokemonFavoriteById = {
  25: true,
};

test('the page contains a heading with the text Encountered pokémons', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />
    </Router>,
  );
  const pokedexHeading = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokedexHeading).toBeInTheDocument();
});

test('the next pokemon is shown when clicking Próximo pokémon', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />
    </Router>,
  );

  const pokemonId = 'pokemon-name';
  const initialPokemon = screen.getByTestId(pokemonId).textContent;
  expect(initialPokemon).toBe('Pikachu');

  const nextButton = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  userEvent.click(nextButton);

  const nextPokemon = screen.getByTestId(pokemonId).textContent;
  expect(nextPokemon).toBe('Charmander');

  const pokemonQuantity = 8;
  for (let i = 1; i <= pokemonQuantity; i += 1) {
    userEvent.click(nextButton)
  };

  const firstPokemon = screen.getByTestId(pokemonId).textContent;
  expect(firstPokemon).toBe('Pikachu');

  const pokemonCards = screen.getAllByTestId(pokemonId).length;
  expect(pokemonCards).toBe(1);
});

test('the filter buttons are working', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />
    </Router>,
  );
  const typeQuantity = 7;
  const filterButton = screen.getAllByTestId('pokemon-type-button');
  expect(filterButton.length).toBe(typeQuantity);

  userEvent.click(filterButton[1]);
  const pokemonTypeFiltered = screen.getByTestId('pokemonType');
  expect(pokemonTypeFiltered.innerHTML).toBe('Fire');
  expect(filterButton[1].innerHTML).toBe(pokemonTypeFiltered.innerHTML);

  const resetFilter = screen.getByText(/All/);
  expect(resetFilter).toBeInTheDocument();
  userEvent.click(resetFilter);
  expect(screen.getByTestId('pokemonType').innerHTML).toBe('Electric');
});

// test('the filter buttons are working', () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={ history }>
//       <Pokedex
//         pokemons={ pokemons }
//         isPokemonFavoriteById={ isPokemonFavoriteById }
//       />
//     </Router>,
//   );

//     const resetFilter = screen.getByText(/All/);
//     expect(resetFilter).toBeInTheDocument();
//     userEvent.click(resetFilter);

// });
