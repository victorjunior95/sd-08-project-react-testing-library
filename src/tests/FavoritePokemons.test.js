import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testing component Favorite Pokémons', () => {
  it('Test: no favorite pokemon found', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);

    const favoriteBtn = getByText('Favorite Pokémons');
    fireEvent.click(favoriteBtn);
    const noFavoritesFound = getByText('No favorite pokemon found');
    expect(noFavoritesFound).toBeInTheDocument();
  });
});
