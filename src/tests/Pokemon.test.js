import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';

import pokemons from '../data';

const defaultPokemon = pokemons[0];

const testIds = {
  pokemonName: 'pokemon-name',
  pokemonType: 'pokemonType',
  pokemonWeight: 'pokemon-weight',
};

const renderPokemon = ({
  pokemon = defaultPokemon,
  showDetailsLink = false,
  isFavorite = false,
} = {}) => (
  renderWithRouter(
    <Pokemon { ...{ pokemon, showDetailsLink, isFavorite } } />,
  )
);

describe('Teste o componente <Pokemon />', () => {
  describe(`Teste se é renderizado um card com as informações de 
determinado pokémon.`, () => {
    test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
      const { getByTestId } = renderPokemon();
      expect(getByTestId(testIds.pokemonName).textContent).toBe(defaultPokemon.name);
    });

    test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      const { getByTestId } = renderPokemon();
      expect(getByTestId(testIds.pokemonType).textContent).toBe(defaultPokemon.type);
    });

    test(`O peso médio do pokémon deve ser exibido com um texto no formato 
Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, 
respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
      const { getByTestId } = renderPokemon();
      const { value, measurementUnit } = defaultPokemon.averageWeight;
      const text = `Average weight: ${value} ${measurementUnit}`;
      expect(getByTestId(testIds.pokemonWeight).textContent).toBe(text);
    });

    test(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo 
src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> 
é o nome do pokémon`, () => {
      const { getByAltText } = renderPokemon();
      const alt = `${defaultPokemon.name} sprite`;
      const src = defaultPokemon.image;
      expect(getByAltText(alt).src).toBe(src);
    });
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de 
navegação para exibir detalhes deste Pokémon. O link deve possuir a URL 
/pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const { getByRole } = renderPokemon({ showDetailsLink: true });
    const link = getByRole('link', { name: /More details/i });
    const pathname = `/pokemons/${defaultPokemon.id}`;
    expect(link.pathname).toBe(pathname);
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito 
o redirecionamento da aplicação para a página de detalhes de Pokémon.
Teste também se a URL exibida no navegador muda para /pokemon/<id>, 
onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { getByRole, history } = renderPokemon({ showDetailsLink: true });
    expect(history.location.pathname).toBe('/');
    const link = getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const pathname = `/pokemons/${defaultPokemon.id}`;
    expect(history.location.pathname).toBe(pathname);
  });

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    test(`O ícone deve ser uma imagem com o atributo src contendo o caminho 
    /star-icon.svg. A imagem deve ter o atributo alt igual a <pokemon> is marked 
    as favorite, onde <pokemon> é o nome do Pokémon exibido.`, () => {
      const { getByAltText } = renderPokemon({ isFavorite: true });
      const alt = `${defaultPokemon.name} is marked as favorite`;
      const icon = getByAltText(alt);
      expect(icon).toBeInTheDocument();
      const src = '/star-icon.svg';
      expect(icon.src.match(new RegExp(src, 'i'))).toBeTruthy();
    });
  });
});
