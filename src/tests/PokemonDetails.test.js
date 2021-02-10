import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';

import data from '../data';

const defaultPokemon = data[0];

const defaultMatch = {
  params: {
    id: `${defaultPokemon.id}`,
  },
};

const onUpdateFavoritePokemonsMock = jest.fn(() => {});

const renderPokemonDetails = ({
  match = defaultMatch,
  pokemons = data,
  isPokemonFavoriteById = {},
  onUpdateFavoritePokemons = onUpdateFavoritePokemonsMock,
} = {}) => (
  renderWithRouter(
    <PokemonDetails
      {
        ...{
          match,
          pokemons,
          isPokemonFavoriteById,
          onUpdateFavoritePokemons,
        }
      }
    />,
  )
);

afterEach(jest.clearAllMocks);

describe('Teste o componente <PokemonDetails />', () => {
  describe(`Teste se as informações detalhadas do Pokémon selecionado 
  são mostradas na tela.`, () => {
    test(`A página deve conter um texto <name> Details, onde 
    <name> é o nome do Pokémon.`, () => {
      const { getByText } = renderPokemonDetails();
      const text = `${defaultPokemon.name} Details`;
      expect(getByText(text)).toBeInTheDocument();
    });

    test(`Não deve existir o link de navegação para os detalhes do 
    Pokémon selecionado.`, () => {
      const { queryByRole } = renderPokemonDetails();
      expect(queryByRole('link', { name: /More details/i })).not.toBeInTheDocument();
    });

    test(`A seção de detalhes deve conter um heading h2 com o texto 
    Summary.`, () => {
      const { getByRole } = renderPokemonDetails();
      expect(getByRole('heading', { level: 2, name: /Summary/i })).toBeInTheDocument();
    });

    test(`A seção de detalhes deve conter um parágrafo com o resumo do 
    Pokémon específico sendo visualizado.`, () => {
      const { getByText } = renderPokemonDetails();
      expect(getByText(defaultPokemon.summary)).toBeInTheDocument();
    });
  });

  describe(`Teste se existe na página uma seção com os mapas contendo as 
  localizações do pokémon.`, () => {
    test(`Na seção de detalhes deverá existir um heading h2 com o texto Game 
    Locations of <name>; onde <name> é o nome do Pokémon exibido.`, () => {
      const { getByRole } = renderPokemonDetails();
      const text = `Game Locations of ${defaultPokemon.name}`;
      expect(getByRole('heading', { name: text })).toBeInTheDocument();
    });

    test(`Todas as localizações do Pokémon devem ser mostradas na seção 
    de detalhes.`, () => {
      const { getByText } = renderPokemonDetails();
      const locations = defaultPokemon.foundAt.map(({ location }) => location);
      locations.forEach((location) => {
        expect(getByText(location)).toBeInTheDocument();
      });
    });

    test(`Devem ser exibidos, o nome da localização e uma imagem do mapa em cada 
    localização.`, () => {
      const { getByText, getAllByAltText } = renderPokemonDetails();
      defaultPokemon.foundAt.forEach(({ location }) => {
        expect(getByText(location)).toBeInTheDocument();
      });
      const alt = `${defaultPokemon.name} location`;
      const images = getAllByAltText(alt);
      expect(images.length).toBe(defaultPokemon.foundAt.length);
    });

    test(`A imagem da localização deve ter um atributo src com a URL da 
    localização.`, () => {
      const { getAllByAltText } = renderPokemonDetails();
      const alt = `${defaultPokemon.name} location`;
      const images = getAllByAltText(alt);
      const sources = defaultPokemon.foundAt.map(({ map }) => map);
      images.forEach(({ src }) => {
        expect(sources.includes(src)).toBeTruthy();
      });
    });

    test(`A imagem da localização deve ter um atributo alt com o texto <name> 
    location, onde <name> é o nome do Pokémon.`, () => {
      const { getAllByAltText } = renderPokemonDetails();
      const alt = `${defaultPokemon.name} location`;
      const images = getAllByAltText(alt);
      expect(images.length).toBe(defaultPokemon.foundAt.length);
    });
  });

  describe(`Teste se existe na página uma seção com os mapas contendo as 
  localizações do pokémon.`, () => {
    test(`A página deve exibir um checkbox que permite favoritar o 
    Pokémon.`, () => {
      const { getByLabelText } = renderPokemonDetails();
      const label = /Pokémon favoritado?/;
      const checkbox = getByLabelText(label);
      const newCheckboxState = !checkbox.checked;
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(0);
      userEvent.click(checkbox);
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(1);
      expect(onUpdateFavoritePokemonsMock)
        .toHaveBeenLastCalledWith(defaultPokemon.id, newCheckboxState);
    });

    test(`Cliques alternados no checkbox devem adicionar e remover 
    respectivamente o Pokémon da lista de favoritos.`, () => {
      const label = /Pokémon favoritado?/;

      const pokemonDetailsA = renderPokemonDetails();
      const checkboxA = pokemonDetailsA.getByLabelText(label);
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(0);
      userEvent.click(checkboxA);
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(1);
      expect(onUpdateFavoritePokemonsMock)
        .toHaveBeenLastCalledWith(defaultPokemon.id, true);

      cleanup();
      onUpdateFavoritePokemonsMock.mockClear();

      const pokemonDetailsB = renderPokemonDetails({
        isPokemonFavoriteById: { [defaultPokemon.id]: true },
      });
      const checkboxB = pokemonDetailsB.getByLabelText(label);
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(0);
      userEvent.click(checkboxB);
      expect(onUpdateFavoritePokemonsMock).toBeCalledTimes(1);
      expect(onUpdateFavoritePokemonsMock)
        .toHaveBeenLastCalledWith(defaultPokemon.id, false);
    });

    test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      const { getByLabelText } = renderPokemonDetails();
      const label = /Pokémon favoritado?/;
      expect(getByLabelText(label)).toBeInTheDocument();
    });
  });
});
