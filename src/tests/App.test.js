import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Req 01', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('The first link must have the text `Home`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
  });

  test('The second link must have the text `About`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/About/i)).toBeInTheDocument();
  });

  test('The third link must have the text `Favorite Pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });
});
