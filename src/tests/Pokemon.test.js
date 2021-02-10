import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pikachu from './pikachu';

describe('Pokemon.js test', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pikachu } />,
    );
    const name = getByTestId('pokemon-name');
    const pika = getByText(/pikachu/i);

    expect(name).toBeInTheDocument();
    expect(pika).toBeInTheDocument();

    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByText(/electric/i)).toBeInTheDocument();

    expect(getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(getByText(/Average weight:/i)).toBeInTheDocument();
    expect(getByText(/6.0/i)).toBeInTheDocument();
    expect(getByText(/kg/i)).toBeInTheDocument();

    const img = getByRole('img');
    const src = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const alt = 'Pikachu sprite';
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(src);
    expect(img.alt).toBe(alt);
  });
  it('teste se contém um link de navegação, e a url contém o id do pokemon', () => {
    const { history, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pikachu } />,
    );
    const detailsLink = getByRole('link', { name: /details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pikachu.id}`);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ 25 } />,
    );
    const star = getAllByRole('img');

    expect(star[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(star[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
