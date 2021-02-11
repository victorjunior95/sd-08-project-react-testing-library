import React from 'react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const favoritePokemons = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Requisito 6 - Teste o componente \\"Pokemon"\\', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite={ favoritePokemons[pokemons[1].id] } />,
    );

    const { value, measurementUnit } = pokemons[1].averageWeight;

    const namePokemon = getByTestId('pokemon-name');
    const typePokemon = getByTestId('pokemonType');
    const weightPokemon = getByTestId('pokemon-weight');
    const imgPokemon = getByRole('img', { name: `${namePokemon.textContent} sprite` });

    expect(namePokemon.textContent).toBe(pokemons[1].name);
    expect(typePokemon.textContent).toBe(pokemons[1].type);
    expect(weightPokemon.textContent)
      .toBe(
        `Average weight: ${value} ${measurementUnit}`,
      );
    expect(imgPokemon.src).toBe(pokemons[1].image);
    expect(imgPokemon.alt).toBe(`${pokemons[1].name} sprite`);
  });

  it(`Teste se o card do Pokémon indicado na Pokédex
    contém um link de navegação para exibir detalhes deste Pokémon.
    O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;`,
  () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite={ favoritePokemons[pokemons[1].id] } />,
    );

    const link = getByRole('link', { name: /more details/i });
    expect(link.pathname).toBe(`/pokemons/${pokemons[1].id}`);
  });

  it(`Teste se existe um ícone de estrela nos Pokémons favoritados.
    O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,
    onde <pokemon> é o nome do Pokémon exibido.`, () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );

    const starFavorite = getByRole('img', {
      name: `${pokemons[1].name} is marked as favorite`,
    });

    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite.src).toContain('/star-icon.svg');
  });
});
