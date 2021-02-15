import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../components/PokemonDetails';
import data from '../data';

const ID1 = 25;
const ID2 = 10;
const mockFavorites = data.reduce((favorites, { id }) => {
  if ([ID1, ID2].includes(id)) favorites[id] = true;
  else favorites[id] = false;
  return favorites;
}, {});

const SELECTED_ID = 10;
const selectedPoke = data.find(({ id }) => id === SELECTED_ID);

const props = {
  isPokemonFavoriteById: mockFavorites,
  match: {
    params: {
      id: `${SELECTED_ID}`,
    },
  },
  onUpdateFavoritePokemons: (pokemonId, checked) => {
    if (checked) props.isPokemonFavoriteById[pokemonId] = true;
    else props.isPokemonFavoriteById[pokemonId] = false;
  },
  pokemons: data,
};

describe('PokemonDetails.js tests', () => {
  it('Should have two h2: `Name Details`, `Summary` and `Game Locations`', () => {
    render(<PokemonDetails { ...props } />);

    const h2Details = screen.getByRole('heading', {
      level: 2,
      name: `${selectedPoke.name} Details`,
    });
    expect(h2Details).toBeInTheDocument();

    const h2Summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(h2Summary).toBeInTheDocument();

    const h2Locations = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${selectedPoke.name}`,
    });
    expect(h2Locations).toBeInTheDocument();
  });

  it('Should not have a details link, have a <Pokemon /> and the proper summary', () => {
    render(<PokemonDetails { ...props } />);

    const detailsLink = screen.queryByRole('link', { name: 'More details' });
    expect(detailsLink).not.toBeInTheDocument();

    const pokeCardName = screen.getByTestId('pokemon-name');
    expect(pokeCardName.textContent).toBe(selectedPoke.name);

    const pokeSummary = screen.getByText(selectedPoke.summary);
    expect(pokeSummary).toBeInTheDocument();
  });

  it('Should have all map locations', () => {
    render(<PokemonDetails { ...props } />);

    selectedPoke.foundAt.forEach(({ location, map }) => {
      const pokeLocation = screen.getByText(location);
      expect(pokeLocation).toBeInTheDocument();

      const pokeMap = screen.getByText((content, element) => (
        element.getAttribute('src') === map
      ));
      expect(pokeMap.getAttribute('alt')).toBe(`${selectedPoke.name} location`);
    });
  });

  it('Should have a checkbox to favorite working', () => {
    const { rerender } = render(<PokemonDetails { ...props } number={ 1 } />);

    let favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    const isFavorite = props.isPokemonFavoriteById[selectedPoke.id];
    if (isFavorite) expect(favCheckbox).toBeChecked();
    else expect(favCheckbox).not.toBeChecked();

    userEvent.click(favCheckbox);

    rerender(<PokemonDetails { ...props } number={ 2 } />);
    favCheckbox = screen.getByLabelText('Pokémon favoritado?');

    if (isFavorite) expect(favCheckbox).not.toBeChecked();
    else expect(favCheckbox).toBeChecked();
  });
});
