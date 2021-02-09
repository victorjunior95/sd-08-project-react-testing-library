import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { history, getByRole } = renderWithRouter(<App />);

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

    userEvent.click(linkHome);
    const enconteredPokemonHomeText = getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(enconteredPokemonHomeText).toBeInTheDocument();
    const pathnameHome = history.location.pathname;
    expect(pathnameHome).toBe('/');

    userEvent.click(linkAbout);
    const aboutPokedexText = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutPokedexText).toBeInTheDocument();
    const pathnameAbout = history.location.pathname;
    expect(pathnameAbout).toBe('/about');

    userEvent.click(linkFavoritePokemons);
    const favoritePokemonText = getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(favoritePokemonText).toBeInTheDocument();
    const pathnameFavorite = history.location.pathname;
    expect(pathnameFavorite).toBe('/favorites');
  });
});
