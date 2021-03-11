import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testando o arquivo Pokemon.js', () => {
  it('Testa a renderização de um card com as informações do pokémon', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');

    expect(screen.getByTestId('pokemonType')).toHaveTextContent('Electric');

    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');

    expect(screen.getByAltText('Pikachu sprite').src)
      .toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Ver se o card tem um link para exibir detalhes', () => {
    const pokemon = pokemons[0];
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const details = screen.getByText('More details');
    expect(details).toBeInTheDocument();

    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Ver se existe um ícone de estrela no pokemon favoritado', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const favorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toContain('star');
  });
});
