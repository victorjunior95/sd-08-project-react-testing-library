import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
};

describe('req 6', () => {
  it('renderiza as informações correta', () => {
    const favs = { favorite: false };
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite={ favs.favorite }
      />,
    );
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const weight = getByTestId('pokemon-weight');
    const image = getByRole('img');
    expect(name.innerHTML).toBe('Pikachu');
    expect(type.innerHTML).toBe('Electric');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(image.alt).toBe('Pikachu sprite');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('link de url para mais informações', () => {
    const favs = { favorite: false };
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite={ favs.favorite }
      />,
    );
    const details = getByText('More details');
    expect(details.href).toContain('/pokemons/25');
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('checando a estrela de favorito', () => {
    const favs = { favorite: true };
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite={ favs.favorite }
      />,
    );
    const star = getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(star.src).toContain('/star-icon.svg');
  });
});
