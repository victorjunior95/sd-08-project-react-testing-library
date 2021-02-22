import React from 'react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../components/route/renderWithRouter'
import data from '../data';

const pokeTest = data[0];
const onUpdateFavoritePokemonsMock = jest.fn(() => {});

const renderPokemonDetails = ({
  isPokemonFavoriteById = {},
  match = {
    params: { id: `${pokeTest.id}` },
  },
  onUpdateFavoritePokemons = mockFavorite,
  pokemons = data,
} = {}) => (
  renderWithRouter(
    <PokemonDetails
      {
        ...{
          isPokemonFavoriteById,
          match,
          onUpdateFavoritePokemons,
          pokemons,
        }
      }
    />,
  )
);

describe('07', () => {
  test(`Teste se as informações detalhadas do Pokémon 
    selecionado são mostradas na tela`, () => {
    const { getByText, queryByRole, getByRole } = renderPokemonDetails();
    const { name, summary } = pokeTest;
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(queryByRole('link', { name: 'More details' })).not.toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument();
    expect(getByText(summary)).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com os mapas 
  contendo as localizações do pokémon`, () => {
    const { getByText, getAllByAltText, getByRole } = renderPokemonDetails();
    const { name, foundAt } = pokeTest;
    const maps = foundAt.map(({ map }) => map);
    expect(getByRole('heading', { name: `Game Locations of ${name}` }))
      .toBeInTheDocument();
    foundAt.forEach(({ location }) => {
      expect(getByText(location)).toBeInTheDocument();
    });
    getAllByAltText(`${name} location`)
      .forEach(({ src }) => {
        expect(maps).toContain(src);
      });
  });

  test(`Teste se o usuário pode favoritar um pokémon 
  através da página de detalhes`, () => {
    const { id } = pokeTest;
    const { getByLabelText } = renderPokemonDetails({
      isPokemonFavoriteById: { [id]: false },
    });
    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(mockFavorite).toBeCalledTimes(0);
    userEvent.click(checkbox);
    expect(mockFavorite).toBeCalledTimes(1);
    expect(mockFavorite).toHaveBeenLastCalledWith(id, true);
  });
});
