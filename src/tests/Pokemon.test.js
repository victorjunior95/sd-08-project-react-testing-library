import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the <Pokemon.js /> component', () => {
  it('should show a pokemon info card', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByRole('button', { name: 'Dragon' }));
    expect(getByText('Dragonair')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toHaveTextContent('Dragon');
    expect(getByText(/Average weight: 16.5 kg/i)).toBeInTheDocument();
    expect(getByRole('img')).toHaveProperty('src', 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    expect(getByRole('img')).toHaveProperty('alt', 'Dragonair sprite');
  });

  it('should have a link in the card to info page', () => {
    const { getByText } = renderWithRouter(<App />);

    const infoButton = getByText(/More details/i);
    expect(infoButton).toBeInTheDocument();
    expect(infoButton).toHaveProperty('href', 'http://localhost/pokemons/25');
  });

  it('should be redirected to Details page when the button is clicked', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/));
    expect(getByText(/Pikachu Details/)).toBeInTheDocument();
    expect(getByText(/Game Locations of Pikachu/)).toBeInTheDocument();
  });

  it('should show a new URL in the browser', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/));
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('should have a star icon in the favorite pokemons', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/));
    fireEvent.click(getByRole('checkbox'));
    expect(getByAltText('Pikachu is marked as favorite')).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
