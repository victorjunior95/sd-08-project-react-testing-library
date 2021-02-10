import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6 - Pokemon.test', () => {
  test('Caminho feliz', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonOverview = document.querySelector('.pokemon-overview');
    expect(pokemonOverview).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemonType');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();

    const pikachuName = screen.getByTestId('pokemon-name');
    const pikachuType = screen.getByTestId('pokemonType');
    const pikachuWeight = screen.getByTestId('pokemon-weight');
    expect(pikachuName).toHaveTextContent(/pikachu/i);
    expect(pikachuType).toHaveTextContent(/electric/i);
    expect(pikachuWeight).toHaveTextContent(/average weight: 6\.0 kg/i);

    const pikachuImageUrl = document.querySelector('img[src="https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png"]');
    const pikachuImageAlt = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuImageUrl).toBeInTheDocument();
    expect(pikachuImageAlt).toBeInTheDocument();

    const pikachuLinkName = screen.getByRole('link', {
      name: /more details/i,
    });
    const pikachuLinkUrl = document.querySelector('a[href="/pokemons/25"]');
    expect(pikachuLinkName).toBeInTheDocument();
    expect(pikachuLinkUrl).toBeInTheDocument();

    userEvent.click(pikachuLinkName);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favoritePikachu = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePikachu);

    const starImageSrc = document.querySelector('img[src="/star-icon.svg"]');
    const starImageAlt = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starImageSrc).toBeInTheDocument();
    expect(starImageAlt).toBeInTheDocument();
  });
});
