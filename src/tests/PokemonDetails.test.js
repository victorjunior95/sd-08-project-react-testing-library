import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Pokemon Details page', () => {
  it('Should details link redirect to pokemon details', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(getByText(/roasts hard berries with electricity/i)).toBeInTheDocument();
  });

  it('Should details link redirect to pokemon details', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const locationImages = getAllByAltText('Pikachu location');
    expect(getByRole('heading', { name: /game locations of pikachu/i }))
      .toBeInTheDocument();
    expect(locationImages.length).toBe(2);
    expect(locationImages[0].src)
      .toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImages[1].src)
      .toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Should favorite/unfavorite pokemon', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const checkFavorite = getByRole('checkbox');
    const checkLabel = getByLabelText(/Pokémon favoritado?/);
    expect(checkFavorite).toBeInTheDocument();
    expect(checkLabel).toBeInTheDocument();

    expect(checkFavorite.checked).toBeFalsy();
    userEvent.click(checkFavorite);
    expect(checkFavorite.checked).toBeTruthy();
    userEvent.dblClick(checkFavorite);
    expect(checkFavorite.checked).toBeTruthy();
  });
});
