import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe.only('Testes do requisito 7', () => {
  it('renders info of a specific Pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeDefined();
    expect(pokemonName.textContent).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeDefined();
    expect(pokemonType.textContent).toBe('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeDefined();
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');

    const urlImagePokemon = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const altImagePokemon = 'Pikachu sprite';
    const image = screen.getByRole('img');
    expect(image.src).toBe(urlImagePokemon);
    expect(image.alt).toBe(altImagePokemon);

    const hrefLinkDetails = '/pokemons/25';
    expect(hrefLinkDetails).toBeDefined();

    const moreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe(hrefLinkDetails);

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckbox);

    const linkFavoritePokemons = screen.getByText('Favorite Pokémons');
    fireEvent.click(linkFavoritePokemons);

    const star = screen.getByAltText(/is marked as favorite/i);
    const starGamb = JSON.stringify(star.src).split('/');
    expect(star).toBeDefined();
    expect(star.alt).toBe('Pikachu is marked as favorite');
    expect(starGamb[3]).toBe('star-icon.svg"');
  });
});
