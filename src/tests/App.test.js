import React from 'react';
import renderWithRouter from './renderWithRouter';
// import screen from '@testing-library/react';
import App from '../App';

describe('Testa Component App', () => {
  test('É renderizada ao carregar a app no caminho de URL /?.',
    () => {
      const { getByText } = renderWithRouter(
        <App />,
      );
      const heading = getByText(/Pokédex/i);
      expect(heading).toBeInTheDocument();
    });
  test('Contem um conjunto fixo de links de navegação?',
    () => {
      const { getByRole } = renderWithRouter(
        <App />,
      );
      const homeLink = getByRole('link', { name: 'Home' });
      expect(homeLink).toBeInTheDocument();

      const about = getByRole('link', { name: 'About' });
      expect(about).toBeInTheDocument();

      const favoritePokemons = getByRole('link', { name: 'Favorite Pokémons' });
      expect(favoritePokemons).toBeInTheDocument();
    });
});
