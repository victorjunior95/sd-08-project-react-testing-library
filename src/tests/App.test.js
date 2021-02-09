import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testing component App.js', () => {
  test('Renders a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Shows the Pokédex when the route is `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  describe('There is a set of links at the top of the page', () => {
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

  test('Shows the About page when route is `/about`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('Shows the Favorite pokemons page when route is `/favorites`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });
});
