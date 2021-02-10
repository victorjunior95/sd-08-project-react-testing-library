import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testes do requisito 3', () => {
  it('renders a message with the text `No favorite pokemon found`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const noFavorites = getByText('No favorite pokemon found');
    expect(noFavorites).toBeDefined();
  });

  it('renders all favorite cards pokemon', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <App />
      </Router>,
    );

    const moreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(moreDetails);

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckbox);

    const linkFavoritePokemons = screen.getByText('Favorite Pokémons');
    fireEvent.click(linkFavoritePokemons);

    const star = screen.getByAltText(/is marked as favorite/i);
    expect(star).toBeDefined();
  });
});
