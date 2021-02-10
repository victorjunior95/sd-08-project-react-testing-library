import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 7', () => {
  const pathToDetails = '/pokemons/78';
  const rapidashId = 78;
  it('should renders details pokemon information', () => {
    const { queryByText, queryByRole, history } = renderWithRouter(<App />);
    history.push(pathToDetails);
    const pokemonNameDetails = queryByText('Rapidash Details');
    const moreDetails = queryByRole('link', {
      name: /More details/i,
    });
    const heading2 = queryByRole('heading', {
      name: 'Summary',
    });
    const summary = queryByText(
      /At full gallop, its four hooves barely touch the ground because/i,
    );
    expect(pokemonNameDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });

  it('should have maps location', () => {
    const pathImage1 = 'https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png';
    const pathImage2 = 'https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png';
    const { queryByRole, queryAllByAltText, history } = renderWithRouter(
      <App />,
    );
    history.push(pathToDetails);
    const heading2 = queryByRole('heading', {
      name: 'Game Locations of Rapidash',
    });
    const allLocations = queryAllByAltText('Rapidash location');
    expect(heading2).toBeInTheDocument();
    expect(allLocations.length).toBe(2);
    expect(allLocations[0]).toHaveAttribute('src', pathImage1);
    expect(expect(allLocations[1]).toHaveAttribute('src', pathImage2));
  });

  it('should have a checkbox Field', () => {
    const { queryByLabelText, history } = renderWithRouter(<App />);
    history.push(pathToDetails);
    const checkbox = queryByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    let favoritePokemonIds = [];
    if (!localStorage.favoritePokemonIds) {
      fireEvent.click(checkbox);
      favoritePokemonIds = JSON.parse(localStorage.favoritePokemonIds);
      expect(favoritePokemonIds.includes(rapidashId)).toBe(true);
    } else {
      favoritePokemonIds = JSON.parse(localStorage.favoritePokemonIds);
      if (favoritePokemonIds.includes(rapidashId)) {
        fireEvent.click(checkbox);
        expect(favoritePokemonIds.includes(rapidashId)).toBe(false);
      } else {
        fireEvent.click(checkbox);
        expect(favoritePokemonIds.includes(rapidashId)).toBe(true);
      }
    }
  });
});
