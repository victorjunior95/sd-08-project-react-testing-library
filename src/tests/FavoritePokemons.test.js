import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test the <FavoritePokemons.js /> component', () => {
  it('should show a message when there arent favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });

  it('should show all favorite pokemons but not those who are not favorite', () => {
    const {
      getByRole,
      getByText,
      getByAltText,
    } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText(/Favorite Pokémons/));
    expect(getByAltText(/Pikachu sprite/)).toBeInTheDocument();
  });
});
