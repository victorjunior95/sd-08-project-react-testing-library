import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('PokemonDetails.js', () => {
  test('if the details infos are correct', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetail = screen.getByRole('link', { name: /More details/i });
    history.push('/pokemons/143');

    const detailHeading = screen.getByRole('heading', { level: 2, name: /details/i });
    expect(detailHeading).toHaveTextContent(/Snorlax details/i);
    expect(linkDetail).not.toBeInTheDocument();

    const detailSummary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(detailSummary).toBeInTheDocument();

    const paragraph = screen.getByText(/What sounds like/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('if shows the maps images', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/148');

    const detailGameLoctions = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Dragonair/i,
    });
    expect(detailGameLoctions).toBeInTheDocument();

    const mapImage = screen.getAllByAltText(/Dragonair location/i);
    const mapCaption0 = screen.getByText(/Johto Route 45/i);
    const mapCaption1 = screen.getByText(/Johto Dragon's Den/i);
    expect(mapImage[0].src).toContain('/Johto_Route_45_Map.png');
    expect(mapCaption0).toBeInTheDocument();
    expect(mapImage[1].src).toContain('/Johto_Dragons_Den_Map.png');
    expect(mapCaption1).toBeInTheDocument();
  });

  test('if has the favorite checkbox render', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/151');

    const favoriteMarker = screen.getByLabelText(/Pokémon favoritado\?/i);
    expect(favoriteMarker).toBeInTheDocument();

    userEvent.click(favoriteMarker);

    const favoriteIcon = screen.getByAltText(/Mew is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(favoriteMarker);

    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
