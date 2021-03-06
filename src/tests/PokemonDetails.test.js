import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the <PokemonDetails.js /> component', () => {
  it('should show the pokemon info', () => {
    const { getByText, queryByText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/));
    expect(getByText(/Pikachu Details/)).toBeInTheDocument();
    expect(queryByText(/More details/)).toBeNull();
    expect(getByRole('heading', { name: 'Summary', level: 2 })).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon roasts hard berries/)).toBeInTheDocument();
  });

  it('should have a section with maps where the pokemons can be found', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/));
    const pikachu = getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(pikachu).toBeInTheDocument();
    expect(getAllByRole('img', { name: 'Pikachu location' })).toHaveLength(2);
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();
    const pikachuMaps = getAllByRole('img', { name: 'Pikachu location' });
    expect(pikachuMaps[0]).toHaveProperty('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuMaps[1]).toHaveProperty('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('should be possible to favorite a pokemon', () => {
    const {
      getByText,
      getByRole,
      queryByAltText,
      getByAltText,
      getByLabelText,
    } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/));
    expect(getByRole('checkbox')).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(queryByAltText('Pikachu is marked as favorite')).toBeNull();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
