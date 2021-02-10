import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const defaultPokemon = pokemons[0];
const pokemonName = 'pokemon-name';
const pokemonType = 'pokemonType';
const pokemonWeight = 'pokemon-weight';

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
  describe(`Teste se é renderizado um card com as 
  informações de determinado pokémon.`, () => {
    it('O nome correto do Pokémon deve ser mostrado na tela.', () => {
      const { getByTestId } = renderPokemon();

      const pokeName = getByTestId(pokemonName);
      expect(pokeName).toHaveTextContent(defaultPokemon.name);
    });

    it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      const { getByTestId } = renderPokemon();

      const pokeType = getByTestId(pokemonType);
      expect(pokeType).toHaveTextContent(defaultPokemon.type);
    });

    it(`O peso médio do pokémon deve ser exibido com um texto no formato 
Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, 
respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
      const { getByTestId } = renderPokemon();

      const pokeWeight = getByTestId(pokemonWeight);
      expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    });

    it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo 
src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> 
é o nome do pokémon`, () => {
      const { getAllByRole } = renderPokemon();

      const pokeImg = getAllByRole('img')[0];
      expect(pokeImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokeImg.alt).toBe(`${defaultPokemon.name} sprite`);
    });
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de 
  navegação para exibir detalhes deste Pokémon. O link deve possuir a URL 
  /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const { getByText } = renderPokemon({ showDetailsLink: true });

    const moreDetails = getByText('More details');
    expect(moreDetails.href).toMatch((/\/pokemons\/25$/));
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito 
  o redirecionamento da aplicação para a página de detalhes de Pokémon. 
  Teste também se a URL exibida no navegador muda para /pokemon/<id>, 
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { getByRole, history } = renderPokemon({ showDetailsLink: true });

    const moreDetails = getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    test(`O ícone deve ser uma imagem com o atributo src contendo o caminho 
    /star-icon.svg. A imagem deve ter o atributo alt igual a <pokemon> is marked 
    as favorite, onde <pokemon> é o nome do Pokémon exibido.`, () => {
      const { getAllByRole } = renderPokemon({ isFavorite: true });

      const favoriteStar = getAllByRole('img')[1];

      expect(favoriteStar.src).toMatch(/\/star-icon.svg$/);
      expect(favoriteStar.alt).toBe(`${defaultPokemon.name} is marked as favorite`);
    });
  });
});
