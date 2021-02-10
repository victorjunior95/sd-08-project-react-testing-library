import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const isFavorite = true;
const pikachuTest = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémto make them tender enough to eat.',
};

describe('Requisito 6', () => {
  it('Teste se é renderizado um card com as informações', () => {
    renderWithRouter(<Pokemon
      pokemon={ pikachuTest }
      isFavorite={ isFavorite }
    />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemonType');
    const average = screen.getByTestId('pokemon-weight');
    const allImages = screen.getAllByRole('img');
    const imgSrc = allImages[0].getAttribute('src');
    const imgAlt = allImages[0].getAttribute('alt');
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(average).toHaveTextContent('Average weight: 6.0 kg');
    expect(imgSrc).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgAlt).toBe('Pikachu sprite');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link ', () => {
    renderWithRouter(<Pokemon
      pokemon={ pikachuTest }
      isFavorite={ isFavorite }
    />);

    const link = screen.getByRole('link');
    const linkHref = link.getAttribute('href');
    expect(linkHref).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pikachuTest }
      isFavorite={ isFavorite }
    />);

    const allImages = screen.getAllByRole('img');
    const imgSrc = allImages[1].getAttribute('src');
    const imgAlt = allImages[1].getAttribute('alt');
    expect(imgSrc).toBe('/star-icon.svg');
    expect(imgAlt).toBe('Pikachu is marked as favorite');
  });
});
