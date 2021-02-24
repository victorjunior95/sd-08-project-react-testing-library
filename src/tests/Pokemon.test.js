import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pokemon from '../components/Pokemon';
import renderWithRouter from '../helper/renderWithRouter';

const mockedPokemon = {
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
  summary: `This intelligent Pokémon roasts hard berries
    with electricity to make them tender enough to eat.`,
};

describe(`Teste se é renderizado um card com as
  informações de determinado pokémon.`, () => {
  it('O nome e tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ mockedPokemon } />);
    const pokeName = screen.getByText('Pikachu');
    const pokeType = screen.getByText('Electric');
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
  });

  it('O peso médio do pokémon deve ser exibido com um texto formatado', () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ mockedPokemon } />);
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokeWeight).toBeInTheDocument();
  });

  it('A imagem do Pokémon deve ser exibida com "src" e "alt" corretamente.', () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ mockedPokemon } />);
    const pokeImage = screen.getByRole('img');
    expect(pokeImage.src).toBe(mockedPokemon.image);
    expect(pokeImage.alt).toBe(`${mockedPokemon.name} sprite`);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ mockedPokemon } />);
    const link = screen.getByRole('link');
    expect(link.pathname).toBe(`/pokemons/${mockedPokemon.id}`);
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito
    o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<Pokemon
      isFavorite={ false }
      pokemon={ mockedPokemon }
    />);

    const link = screen.getByRole('link');
    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockedPokemon.id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ mockedPokemon } />);
    const starImg = screen.getAllByRole('img')[1];
    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
    expect(starImg.alt).toBe(`${mockedPokemon.name} is marked as favorite`);
  });
});
