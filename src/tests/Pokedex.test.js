import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Button, Pokedex } from '../components';

describe('tests Pokédex application features with events', () => {
  // test('renders a heading level 2 with text `Encounterd pokémons`', () => {
  //   const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
  //   const heading = getByRole('heading', { level: 2 });
  //   expect(heading).toBeInTheDocument();
  // });

  test('next Pokémon button', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByText('Próximo pokémon');
    expect(nextPokemonButton).toBeInTheDocument();
  });

  test('renders a heading level 2 with text ``', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  test('all type buttons text content', () => {
    const { queryAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const buttons = queryAllByTestId('pokemon-type-button');
    console.log(buttons[0].textContent);
    const types = pokemons.reduce((acc, cur) => {
      if (!acc.includes(cur.type)) {
        acc.push(cur.type);
      }
      return acc;
    }, []);
    buttons.forEach((pokemon, index) => {
      expect(pokemon.textContent).toEqual(types[index]);
    });
  });

  test('filter all button text content', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const filterAll = getByRole('button', { name: /all/i });
    expect(filterAll.textContent).toBe('All');
  });

  test('filter all button parameter to be `all`', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const filterAll = getByRole('button', { name: /all/i });
    console.log(filterAll);
    fireEvent.click(filterAll);
  });

  test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={ handleClick }>All</Button>);
    fireEvent.click(screen.getByText(/all/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
