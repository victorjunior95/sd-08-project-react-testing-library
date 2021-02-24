import React from 'react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

const selecionado = pokemons[0];
const { id, name, type, image, averageWeight } = selecionado;
const { measurementUnit, value } = averageWeight;

describe('Req06', () => {
  test('Renderizar um card', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ selecionado }
      />,
    );
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    const peso = `Average weight: ${value} ${measurementUnit}`;
    expect(getByText(peso)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`).src).toBe(image);
  });

  test('Link com mais detalhes', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ selecionado }
      />,
    );
    const link = getByRole('link');
    expect(link.href).toBe(`http://localhost/pokemons/${id}`);
  });

  test('Possui estrela', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ selecionado }
      />,
    );
    const estrela = getByAltText(`${name} is marked as favorite`);
    expect(estrela).toBeInTheDocument();
    expect(estrela.src).toBe('http://localhost/star-icon.svg');
  });
});
