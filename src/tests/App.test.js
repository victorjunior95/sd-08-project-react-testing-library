import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testing component Pokedex', () => {
  it('Test: render the home page', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeButton = getByText('Home');
    fireEvent.click(homeButton);
    const homePage = getByText('Encountered pokémons');
    expect(homePage).toBeInTheDocument();
  });

  it('Test: render the About page', () => {
    const { getByText } = renderWithRouter(<App />);

    const aboutButton = getByText('About');
    fireEvent.click(aboutButton);
    const aboutPage = getByText('About Pokédex');
    expect(aboutPage).toBeInTheDocument();
  });

  it('Test: render the Favorite Pokémons page', () => {
    const { getByText } = renderWithRouter(<App />);

    const favoriteButton = getByText('Favorite Pokémons');
    fireEvent.click(favoriteButton);
    const favoritePage = getByText('Favorite pokémons');
    expect(favoritePage).toBeInTheDocument();
  });
});
