import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const pokemon = pokemons[0];
const prop = { params: { id: `${pokemon.id}` } };
const ids = pokemons.map(({ id }) => id);
const favorites = ids.reduce(
  (acc, curr) => ({ ...acc, [parseInt(curr, 10)]: false }), {},
);
const onUpdateFavoritePokemons = (id, checked) => {
  favorites[id] = checked;
};

const DetailsComponent = () => (
  <PokemonDetails
    match={ prop }
    pokemons={ pokemons }
    isPokemonFavoriteById={ favorites }
    onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
  />
);

describe('Requisito 7', () => {
  it('Informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByText, queryByRole } = renderWithRouter(DetailsComponent());
    const { name, summary } = pokemon;
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText(summary)).toBeInTheDocument();
    expect(queryByRole('link', { name: /details/ })).toBeNull();
  });

  it('Existe na página uma seção com mapas contendo as localizações do pokémon', () => {
    const { getByText, queryByRole, getAllByAltText } = renderWithRouter(
      DetailsComponent(),
    );
    const { foundAt, name } = pokemon;
    expect(queryByRole('heading', { name: `Game Locations of ${name}` })).not.toBeNull();
    const maps = getAllByAltText(`${name} location`);
    foundAt.forEach(({ location, map }, index) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(maps[index]).toHaveAttribute('src', map);
    });
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { queryByLabelText, queryByAltText, rerender } = renderWithRouter(
      DetailsComponent(),
    );
    const { name } = pokemon;

    const unchecked = queryByLabelText('Pokémon favoritado?');
    expect(unchecked).toBeInTheDocument();
    userEvent.click(unchecked);
    rerender(DetailsComponent());

    const icon = queryByAltText(`${name} is marked as favorite`);
    expect(icon).not.toBeNull();
    const checked = queryByLabelText('Pokémon favoritado?');
    userEvent.click(checked);
    rerender(DetailsComponent());

    expect(queryByAltText(`${name} is marked as favorite`)).toBeNull();
  });
});
