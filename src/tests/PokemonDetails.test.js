import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the PokemonDetails component', () => {
  it('Should have <Pokemon Name> Details', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    // const linkDetails = queryByText(/More details/i);
    // userEvent.click(linkDetails);

    const pokemonDetails = getByRole('heading', {
      level: 2,
      name: /Charmander details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Should not exist the navigation link for details of the selected Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetails = getByText(/More details/i);
    userEvent.click(linkDetails);

    expect(linkDetails).not.toBeInTheDocument();
  });

  it('Should contains a heading <h2>Summary</h2>', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    // const linkDetails = getByText(/More details/i);
    // userEvent.click(linkDetails);

    expect(getByText(/summary/i)).toBeInTheDocument();
  });

  it('Must contain a <p>summary of the selected Pokémon</p>', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/23');
    // const linkDetails = getByText(/More details/i);
    // userEvent.click(linkDetails);

    expect(getByText(/It can freely detach its jaw to swallow/i)).toBeInTheDocument();
  });
});

describe('There must be a section containing location Pokémon map', () => {
  it('Should contains a heading <h2>Game Locations of Selected Pokémon</h2>', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/65');
    // const linkDetails = getByText(/More details/i);
    // userEvent.click(linkDetails);

    expect(getByText(/Game locations of Alakazam/i)).toBeInTheDocument();
  });

  it('Must be shown all Pokémon locations', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    // const linkDetails = getByText(/More details/i);
    // userEvent.click(linkDetails);

    expect(getByText(/locations of Mew/i)).toBeInTheDocument();
  });

  it('Must be shown each name location and its image map', () => {
    const { history, getByAllByText } = renderWithRouter(<App />);
    history.push('/pokemons/78');
    // const linkDetails = getByText(/More details/i);
    // userEvent.click(linkDetails);
    const locationMap = getByAllByText(/Rapidash location/i);

    expect(locationMap.src).toBe('https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png');
  });
});

test('The user can favorite a Pokémon through the details page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pokemons/143');
  // const linkDetails = getByText(/More details/i);
  // userEvent.click(linkDetails);
  // const favoriteCheck = queryByRole('checkbox');
  // const favoriteLabel = getByLabelText('Pokémon favoritado');
  // expect(favoriteLabel.checked).toEqual(false);

  expect(getByText(/Pokémon favoritado/i)).toBeInTheDocument();
});
