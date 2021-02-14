import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe.only('Testes do requisito 7', () => {
  it('renders info of a specific Pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const heading = screen.getAllByRole('heading', { level: 2 });
    expect(heading[0]).toBeDefined();
    expect(heading[0].textContent).toBe('Pikachu Details');

    const moreDetails = screen.queryByRole('link', {
      name: /More details/i,
    });
    expect(moreDetails).toBeNull();

    const description = screen.getByText(/berries with electricity/i);
    expect(description).toBeInTheDocument();

    const summary = heading[1];
    expect(summary).toBeDefined();
    expect(summary.textContent).toBe(' Summary ');

    const gameLocationsPokemon = heading[2];
    expect(gameLocationsPokemon).toBeDefined();
    expect(gameLocationsPokemon.textContent).toBe('Game Locations of Pikachu');

    const images = screen.getAllByRole('img');
    const location = images[1];
    const srcImage = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const altImage = 'Pikachu location';

    expect(location).toBeDefined();
    expect(location.src).toBe(srcImage);
    expect(location.alt).toBe(altImage);

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeDefined();
  });
});
