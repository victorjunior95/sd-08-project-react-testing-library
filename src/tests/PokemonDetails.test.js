import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('REQ VII - Testing PokemonDetails', () => {
  it('7.1 - Should test if link pokemon details work', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const detailsPokemon = getByText(/Pikachu Details/i);
    expect(detailsPokemon).toBeInTheDocument();
    const HEADING = getByRole('heading', { name: /summary/i });
    expect(HEADING).toBeInTheDocument();
    expect(getByText(/roasts hard berries with electricity/i)).toBeInTheDocument();
  });

  it('7.2 - Should test if map of the localization pokemon render', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const location = getAllByAltText('Pikachu location');
    expect(getByRole('heading', { name: /game locations of pikachu/i }))
      .toBeInTheDocument();
    expect(location.length).toBe(2);
    expect(location[0].src)
      .toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(location[1].src)
      .toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('7.3 - Should test if user can favorite or not Pokemon', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const favoriteCheckBox = getByRole('checkbox');
    const checkLabel = getByLabelText(/Pokémon favoritado?/);
    expect(favoriteCheckBox).toBeInTheDocument();
    expect(checkLabel).toBeInTheDocument();

    expect(favoriteCheckBox.checked).toBeFalsy();
    userEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox.checked).toBeTruthy();
    userEvent.dblClick(favoriteCheckBox);
    expect(favoriteCheckBox.checked).toBeTruthy();
  });
});
