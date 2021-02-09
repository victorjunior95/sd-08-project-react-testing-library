import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const card = pokemons[1];
const screenRender = () => {
  renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ { 4: false } }
      match={ { params: { id: '4' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />,
  );
};

describe('Teste se detalhes do Pokémon selecionado são mostradas na tela', () => {
  it('Deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    screenRender();
    const title = screen.getByText(`${card.name} Details`);
    const titleData = 'Charmander Details';
    expect(title.textContent).toBe(titleData);
  });

  it('Não deve existir o link de navegação para os detalhes do Pokémon', () => {
    screenRender();
    const linkDetails = screen.queryByRole(/More details/i);
    expect(linkDetails).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    screenRender();
    const heading = screen.getByText(/Summary/i);
    expect(heading).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    screenRender();
    expect(screen.getByText(/the flame on its tail shows/i)).toBeInTheDocument();
  });
});

describe('Teste se existe uma seção com as localizações do pokémon', () => {
  it('Deverá existir um h2 com o texto Game Locations of'
  + ' <name> onde <name> é o nome do Pokémon', () => {
    screenRender();
    const title = screen.getByText(`Game Locations of ${card.name}`);
    const titleData = 'Game Locations of Charmander';
    expect(title.textContent).toBe(titleData);
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes'
 + ' + Devem ser exibidos o nome,a localização, e uma imagem em cada localização'
 + ' + A imagem da localização deve ter um  alt com o texto <name> location', () => {
    screenRender();
    const image = screen.getAllByRole('img', { name: `${card.name} location` });
    card.foundAt.forEach((local, indexLocal) => {
      const imageLocal = image[indexLocal];
      expect(imageLocal).toBeInTheDocument();
      const nameLocal = screen.getByText(local.location);
      expect(nameLocal).toBeInTheDocument();
      const srcImageLocal = local.map;
      expect(imageLocal).toHaveAttribute('src', srcImageLocal);
    });
  });
});

describe('Teste se o usuário pode favoritar um Pokémon na página de detalhes', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    screenRender();
    const checkLabel = screen.getByRole('checkbox', { name: /Pokémon favoritado?/ });
    expect(checkLabel).toBeInTheDocument();
  });

  it('Cliques no checkbox devem adicionar e remover da lista de favoritos', () => {
    screenRender();
    const checkBox = screen.getByRole('checkbox');
    fireEvent.change(checkBox, { target: { checked: true } });
    expect(checkBox.checked).toEqual(true);
    fireEvent.change(checkBox, { target: { checked: false } });
    expect(checkBox.checked).toEqual(false);
  });
});

// existem duas formas de "chamar os seletores"...
// importando, e depois desestruturando, ( { getByRole } = renderWithRouter.....), e nesse caso, seria necessário
// OU uma renderização diferente para cada it, ou então, usar tests ao invés de it sem descriminar os subtestes.
// ou ainda, a opção escolhida. criei uma função com a renderização padrão, e então ao invés de ficar importando e desestruturando,
// apenas chamava a renderização padrão, e utilizava screen.seletores....
// Optei por assim fazer afim de simplificar o codigo ao mesmo paasso que evidenciava cada subteste.
// A lógica inicial implementada veio na época ( primeira vez que fiz o projeto á um mês), de minha colega Ana Karine.
// Mas afim de evidenciar os subtestes realizei todas modificações e refatoraçções necessarias.
// O trabalho dela : https://github.com/tryber/sd-07-project-react-testing-library/pull/91
