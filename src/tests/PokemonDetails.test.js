import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes PokemonDetails.js', () => {
  it('aa', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getAllByRole('link')[3];
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    expect(screen.getByText(/Pikachu Details/i)).toBeInTheDocument();

    const h2Sumary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(h2Sumary).toBeInTheDocument();

    const pSumary = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(pSumary).toBeInTheDocument();

    const pGameLoca = screen.getByText(/Game Locations of Pikachu/i);
    expect(pGameLoca).toBeInTheDocument();

    const LocationImg = screen.getAllByRole('img')[1];
    expect(LocationImg.alt).toEqual('Pikachu location');
    expect(LocationImg.src).toEqual('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const LocationImg2 = screen.getAllByRole('img')[2];
    expect(LocationImg2.alt).toEqual('Pikachu location');
    expect(LocationImg2.src).toEqual('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const pokeFavoritado = screen.getByText(/Pokémon favoritado?/i);
    expect(pokeFavoritado).toBeInTheDocument();
    expect(pokeFavoritado).toHaveTextContent('Pokémon favoritado?');
  });
});
