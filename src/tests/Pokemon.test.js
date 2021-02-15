import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderwithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import mockPokemons from '../services/mockPokemons';
import mockFavorite from '../services/mockFavorite';

const POKEMON_NAME = 'pokemon-name';
const POKEMON_TYPE = 'pokemonType';
const POKEMON_WEIGHT = 'pokemon-weight';

describe('Teste se é renderizado um card com as informações'
  + ' de determinado pokémon.', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderwithRouter(<Pokemon
      pokemon={ mockPokemons[0] }
      isFavorite={ mockFavorite[25] }
    />);
    const pokeName = screen.getByTestId(POKEMON_NAME).textContent;
    expect(pokeName).toBe('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderwithRouter(<Pokemon
      pokemon={ mockPokemons[0] }
      isFavorite={ mockFavorite[25] }
    />);
    const pokeType = screen.getByTestId(POKEMON_TYPE).textContent;
    expect(pokeType).toBe('Electric');
  });

  it('O peso médio do pokémon deve ser exibido com um texto no formato'
  + ' Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit>'
  + ' são, respectivamente, o peso médio do pokémon e sua unidade de medida', () => {
    renderwithRouter(<Pokemon
      pokemon={ mockPokemons[0] }
      isFavorite={ mockFavorite[25] }
    />);
    const pokeWeight = screen.getByTestId(POKEMON_WEIGHT).textContent;
    expect(pokeWeight).toBe('Average weight: 6.0 kg');
  });

  it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL'
  + ' da imagem e um atributo alt com o texto <name> sprite,'
  + ' onde <name> é o nome do pokémon', () => {
    renderwithRouter(<Pokemon
      pokemon={ mockPokemons[0] }
      isFavorite={ mockFavorite[25] }
    />);
    const pokeImage = screen.getAllByRole('img')[0].src;
    expect(pokeImage).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

describe('Teste o componente <Pokemon.js /> - 2', () => {
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
  + ' para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
  + ' onde <id> é o id do Pokémon exibido', () => {
    renderwithRouter(<Pokemon
      pokemon={ mockPokemons[0] }
      isFavorite={ mockFavorite[25] }
    />);
    const linkDetails = screen.getByRole('link').href;
    expect(linkDetails.indexOf(`/pokemons/${mockPokemons[0].id}`)).toBeGreaterThan(0);
  });
});

describe('Teste o componente <Pokemon.js /> - 3', () => {
  it('Teste se ao clicar no link de navegação do Pokémon, é feito'
  + ' o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    renderwithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const heading = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(heading).toBeInTheDocument();
  });
});

describe('Teste o componente <Pokemon.js /> - 4', () => {
  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
  + ' onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderwithRouter(<Pokemon
      pokemon={ mockPokemons[0] }
      isFavorite={ mockFavorite[25] }
    />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockPokemons[0].id}`);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  it('O ícone deve ser uma imagem com o atributo'
  + ' src contendo o caminho /star-icon.svg', () => {
    renderwithRouter(<Pokemon
      pokemon={ mockPokemons[0] }
      isFavorite={ mockFavorite[25] }
    />);
    const favoriteImage = screen.getAllByRole('img')[1].src;
    expect(favoriteImage.indexOf('/star-icon.svg')).toBeGreaterThan(0);
  });

  it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,'
  + ' onde <pokemon> é o nome do Pokémon exibido', () => {
    renderwithRouter(<Pokemon
      pokemon={ mockPokemons[0] }
      isFavorite={ mockFavorite[25] }
    />);
    const altText = screen.getByAltText(`${mockPokemons[0].name} is marked as favorite`);
    expect(altText).toBeInTheDocument();
  });
});
