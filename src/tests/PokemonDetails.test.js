import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PokemonDetails } from '../components';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const { id, name, foundAt } = pokemons[0];

describe('Render <PokemonDetails /> component,`', () => {
  it('show details pokemon', () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    expect(pathname).toBe('/');
    let linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    pathname = history.location.pathname;
    expect(pathname).toBe(`/pokemons/${id}`);

    const pokemonDetailsHeading = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(pokemonDetailsHeading).toBeInTheDocument();

    linkDetails = screen.queryByRole('link', { name: /more details/i });
    expect(linkDetails).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summaryHeading).toBeInTheDocument();

    const description = screen.getByText(/This intelligent Pokémon/i);
    expect(description).toBeInTheDocument();
  });

  it('show locations pokemon', () => {
    renderWithRouter(PokemonDetails.renderHabitat({ foundAt, name }));

    const mapHeading = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(mapHeading).toBeInTheDocument();

    const mapsLocation = screen.getAllByAltText(/location/i);
    mapsLocation.forEach((mapLocation, index) => {
      expect(mapLocation).toHaveAttribute('alt', `${name} location`);
      expect(mapLocation).toHaveAttribute('src', foundAt[index].map);
      const local = screen.queryByText(foundAt[index].location);
      expect(local).toBeInTheDocument();
    });
  });

  it('shows checkbox to favor pokemon', () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    expect(pathname).toBe('/');
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    pathname = history.location.pathname;
    expect(pathname).toBe(`/pokemons/${id}`);

    const checked = screen.getByLabelText(/pokémon favoritado?/i);
    expect(checked).toBeInTheDocument();
    expect(checked).not.toBeChecked();

    let imageStar = screen.queryByAltText(`${name} is marked as favorite`);
    expect(imageStar).not.toBeInTheDocument();

    userEvent.click(checked);

    const schecked = screen.getByRole('checkbox', { checked: true });
    expect(schecked).toBeInTheDocument();
    expect(schecked).toBeChecked();

    imageStar = screen.queryByAltText(`${name} is marked as favorite`);
    expect(imageStar).toBeInTheDocument();
  });
});
