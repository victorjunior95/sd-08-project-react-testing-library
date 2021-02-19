import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests the Pokemon component', () => {
  test('tests the pokemon card', () => {
    const { getByText, getByAltText, getByTestId } = renderWithRouter(<App />);

    expect(getByText(/Pikachu/)).toBeInTheDocument();
    expect(getByText(/Average weight: 6.0 kg/)).toBeInTheDocument();
    expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
    expect(getByAltText(/Pikachu sprite/)).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('tests more details link and favorite pokemon', () => {
    const { getByText, getByLabelText, getByAltText, history } = renderWithRouter(
      <App />,
    );
    const buttonDetails = getByText(/More details/i);
    const buttonHome = getByText(/Home/);

    fireEvent.click(buttonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const markFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(markFavorite);
    fireEvent.click(buttonHome);
    expect(getByAltText('Pikachu is marked as favorite')).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
  });
});
