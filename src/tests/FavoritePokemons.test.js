import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import render from '../renderWithRouter';
import pokemons from '../data';

const ROUTE = { route: '/favorites' };

describe('Tests "Favorite Pokémons" page', () => {
  it('renders a subheading with the text `Favorite pokémons`', () => {
    const { getByRole } = render(<App />, ROUTE);
    const subHeading = getByRole('heading', { level: 2 });
    expect(subHeading).toContainHTML('Favorite pokémons');
  });

  it('renders a message when no favorite is found', () => {
    const { getByText } = render(<App />, ROUTE);
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  it('renders cards only when there are favorites', () => {
    const { getByText, getByLabelText } = render(<App />, ROUTE);

    let parentDiv = document.querySelector('.favorite-pokemons');
    expect(parentDiv).toBeNull();

    fireEvent.click(getByText('Home'));
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));

    parentDiv = document.querySelectorAll('.favorite-pokemons');
    expect(parentDiv.length).toBe(1);
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });
});
