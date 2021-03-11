import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste dos detalhes do Pokemon', () => {
  it('Testa se os detalhes, mapas e favoritação do Pokemon são mostrados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getAllByRole('link')[3];
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    expect(screen.getByText(/Pikachu Details/i)).toBeInTheDocument();

    const findSummary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(findSummary).toBeInTheDocument();

    const summary = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(summary).toBeInTheDocument();

    const gameLocal = screen.getByText(/Game Locations of Pikachu/i);
    expect(gameLocal).toBeInTheDocument();

    const imgLocation1 = screen.getAllByRole('img')[1];
    expect(imgLocation1.alt).toEqual('Pikachu location');
    expect(imgLocation1.src).toEqual('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const imgLocation2 = screen.getAllByRole('img')[2];
    expect(imgLocation2.alt).toEqual('Pikachu location');
    expect(imgLocation2.src).toEqual('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const favorite = screen.getByText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveTextContent('Pokémon favoritado?');
  });
});
