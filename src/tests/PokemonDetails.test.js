import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderwithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import mockFavorite from '../services/mockFavorite';
import mockPokemons from '../services/mockPokemons';

describe('Teste se as informações detalhadas do Pokémon '
+ 'selecionado são mostradas na tela', () => {
  it('A página deve conter um texto <name> Details,'
  + ' onde <name> é o nome do Pokémon', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: `${mockPokemons[0].name} Details` });
    expect(heading).toBeInTheDocument();
  });

  it('Não deve existir o link de navegação para os'
  + ' detalhes do Pokémon selecionado.', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const link = screen.queryByRole('link', { name: 'More Details' });
    expect(link).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary' });
    expect(heading).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo'
  + ' do Pokémon específico sendo visualizado.', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary' });
    const section = heading.parentNode;
    const filho = [...section.children].filter((element) => element.tagName === 'P');
    expect(filho.length).toBe(1);
  });
});

describe('Teste se existe na página uma seção com os mapas'
+ ' contendo as localizações do pokémon', () => {
  it('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations'
  + ' of <name>; onde <name> é o nome do Pokémon exibido.', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${mockPokemons[0].name}` });
    expect(heading).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes'
  + 'A imagem da localização deve ter um atributo alt com o texto <name> location,'
  + ' onde <name> é o nome do Pokémon;', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const locations = mockPokemons[0].foundAt.map((loc) => loc.location);
    const altImg = screen.getAllByAltText(`${mockPokemons[0].name} location`);
    expect(altImg.length).toBe(locations.length);
  });

  it('Devem ser exibidos, o nome da localização e uma imagem'
  + ' do mapa em cada localização'
  + 'A imagem da localização deve ter um atributo src com a URL da localização', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const imgs = screen.getAllByRole('img');
    const loc1 = screen.getByText(`${mockPokemons[0].foundAt[0].location}`);
    const loc2 = screen.getByText(`${mockPokemons[0].foundAt[1].location}`);
    expect(imgs[2].src).toBe(mockPokemons[0].foundAt[0].map);
    expect(imgs[3].src).toBe(mockPokemons[0].foundAt[1].map);
    expect(loc1).toBeInTheDocument();
    expect(loc2).toBeInTheDocument();
  });
});

describe('Teste se o usuário pode favoritar um pokémon'
+ ' através da página de detalhes.', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon'
  + 'O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('Cliques alternados no checkbox devem adicionar e remover respectivamente'
  + ' o Pokémon da lista de favoritos', () => {
    renderwithRouter(<PokemonDetails
      isPokemonFavoriteById={ mockFavorite }
      pokemons={ mockPokemons }
      onUpdateFavoritePokemons={ () => true }
      match={ { params: { id: '25' } } }
    />);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const favimg = screen.queryByAltText(`${mockPokemons[0].name} is marked as favorite`);
    expect(favimg).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
