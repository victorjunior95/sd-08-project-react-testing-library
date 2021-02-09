import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('group of tests for App.js', () => {
  it('test links from Pokedex', async () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokedexHeader = getByRole('heading', {
      level: 1,
    });
    expect(pokedexHeader).toBeInTheDocument();

    const linkHome = getByRole('link', {
      name: /home/i,
    });
    const linkAbout = getByRole('link', {
      name: /about/i,
    });
    const linkFavoritePokemons = getByRole('link', {
      name: /favorite pokémons/i,
    });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});
