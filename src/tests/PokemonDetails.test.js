import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests for PokemonDetails.js via App', () => {
  it('verifies textElements in screen', () => {
    const {
      getByRole, getByText, history,
    } = renderWithRouter(
      <App />,
    );
    expect(history.location.pathname).toBe('/');
    const detailsLink = getByRole('link', { name: /More details/ });
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
    const pkName = 'Pikachu';
    const pkType = getByText('Electric');
    const pkAvWeight = getByText('Average weight: 6.0 kg');
    const pkTitleDetails = getByRole('heading', { level: 2, name: `${pkName} Details` });
    const titleSumm = getByRole('heading', { level: 2, name: /Summary/ });
    const summTxt = getByText(['This intelligent Pokémon roasts hard berries',
      'with electricity to make them tender enough to eat.'].join(' '));
    const locts = getByText(`Game Locations of ${pkName}`);
    const pkFav = getByRole('checkbox', { name: /Pokémon favoritado?/i });
    const allData = [
      pkType, pkAvWeight, pkTitleDetails, titleSumm, summTxt, locts, pkFav];
    allData.forEach((element) => expect(element).toBeInTheDocument());
  });
  it('verifies the images elements in the screen', () => {
    const {
      getByRole, getAllByRole, getByText, getByAltText, history,
    } = renderWithRouter(
      <App />,
    );
    expect(history.location.pathname).toBe('/');
    const detailsLink = getByRole('link', { name: /More details/ });
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
    const pkName = 'Pikachu';
    const allImgs = getAllByRole('img');
    allImgs.forEach((image) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src');
    });
    const pikImg = getByAltText(`${pkName} sprite`);
    expect(allImgs[0]).toBe(pikImg);
    expect(allImgs[(1, 2)].alt).toBe(`${pkName} location`);
    expect(allImgs[1].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allImgs[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(getByText('Kanto Viridian Forest', 'Kanto Power Plant')).toBeInTheDocument();
  });
});
