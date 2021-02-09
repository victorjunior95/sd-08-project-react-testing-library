import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';

describe('tests Pokédex application features with events', () => {
  test('renders a heading level 2 with text `Encounterd pokémons`', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
