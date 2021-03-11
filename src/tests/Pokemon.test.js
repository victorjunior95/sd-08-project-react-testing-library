import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Teste no Componente Pokémon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const { getByText, getByAltText } = renderWithRouter(
        <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
      );
      const nome = getByText(pokemons[0].name);
      expect(nome).toBeInTheDocument();

      const tipo = getByText(pokemons[0].type);
      expect(tipo).toBeInTheDocument();

      const peso = getByText('Average weight: 6.0 kg');
      expect(peso).toBeInTheDocument();

      const img = getByAltText('Pikachu sprite');
      expect(img).toHaveAttribute('alt', 'Pikachu sprite');
      expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação',
    () => {
      const { getByText, history } = renderWithRouter(
        <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
      );
      const link = getByText('More details');
      fireEvent.click(link);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const imgEstrela = getByAltText('Pikachu is marked as favorite');
    expect(imgEstrela).toHaveAttribute('src', '/star-icon.svg');
    expect(imgEstrela).toHaveAttribute('alt',
      `${pokemons[0].name} is marked as favorite`);
  });
});
