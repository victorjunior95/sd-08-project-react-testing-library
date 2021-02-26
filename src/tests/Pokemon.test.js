import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

const isFavorite = true;
describe('TESTE REQUISITO 6#', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon ', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isFavorite }
      />,
    );
    const name = getByText('Pikachu').innerHTML;
    const type = getByText(/Electric/).innerHTML;
    const weigth = getByText(/average weight: 6.0 kg/i);
    const img = getByAltText('Pikachu sprite');

    expect(name).toBe('Pikachu');
    expect(type).toBe('Electric');
    expect(weigth).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });
  it('Teste se o card do Pokémon indicado Pokédex contém um link de navegação ', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isFavorite }
      />,
    );
    const link = getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isFavorite }
      />,
    );
    const starLink = getByAltText('Pikachu is marked as favorite');
    expect(starLink).toBeInTheDocument();
    expect(starLink.src).toBe('http://localhost/star-icon.svg');
  });
});
