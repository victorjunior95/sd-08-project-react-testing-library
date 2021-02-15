import React from 'react';
import { screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

const dataLength = data.length;
const RANDOM_0_LENGTH = Math.floor(Math.random() * dataLength);
const randomPoke = data[RANDOM_0_LENGTH];

describe('Pokemon.js tests', () => {
  it('Should have pokemon info rendered correctly and not be favorite', () => {
    renderWithRouter(<Pokemon pokemon={ randomPoke } isFavorite={ false } />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.textContent).toBe(randomPoke.name);

    const pokeType = screen.getByTestId('pokemonType');
    expect(pokeType.textContent).toBe(randomPoke.type);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = randomPoke.averageWeight;
    expect(pokeWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);

    const pokeImg = screen.getByText((content, element) => (
      element.tagName === 'IMG' && element.getAttribute('src') === randomPoke.image
    ));
    expect(pokeImg.getAttribute('alt')).toBe(`${randomPoke.name} sprite`);

    const pokeFavIcon = screen.queryByText((content, element) => (
      element.tagName === 'IMG' && element.getAttribute('src') === '/star-icon.svg'
    ));
    expect(pokeFavIcon).not.toBeInTheDocument();
  });

  it('Should follow link router and be favorite', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ randomPoke } isFavorite />);

    const pokeFavIcon = screen.getByText((content, element) => (
      element.tagName === 'IMG' && element.getAttribute('src') === '/star-icon.svg'
    ));
    expect(pokeFavIcon.getAttribute('alt')).toBe(
      `${randomPoke.name} is marked as favorite`,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink.getAttribute('href')).toBe(`/pokemons/${randomPoke.id}`);

    let { pathname } = history.location;
    expect(pathname).toBe('/');

    UserEvent.click(detailsLink);

    pathname = history.location.pathname;
    expect(pathname).toBe(`/pokemons/${randomPoke.id}`);
  });
});
