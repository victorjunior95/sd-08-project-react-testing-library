import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pokemon = pokemons[0];

describe('Requisito 6', () => {
  it('Informações do pokemon renderizado', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemon } />,
    );
    const { name, type, averageWeight, image } = pokemon;
    const { measurementUnit, value } = averageWeight;
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    const img = getByAltText(`${name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(image);
  });

  it('Verifica link de detalhes no card', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemon } />,
    );
    const { id } = pokemon;
    history.push = jest.fn();
    const link = getByRole('link', { name: /details/ });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.push).toHaveBeenCalledWith(`pokemons/${id}`);
  });

  it('Testa a navegação para os detalhes do pokemon', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemon } />,
    );
    const { id } = pokemon;
    const link = getByRole('link', { name: /details/ });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica icone de favoritado', () => {
    const { queryByAltText } = renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemon } />,
    );
    const { name } = pokemon;
    const icon = queryByAltText(`${name} is marked as favorite`);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });

  it('Icone de favoritado não está presente caso o pokemon não seja favorito', () => {
    const { queryByAltText } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemon } />,
    );
    const { name } = pokemon;
    const icon = queryByAltText(`${name} is marked as favorite`);
    expect(icon).toBeNull();
  });
});
