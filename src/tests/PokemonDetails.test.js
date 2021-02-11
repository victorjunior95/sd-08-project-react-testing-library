import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testes Requisito 7 - Teste se as informações são mostradas na tela.', () => {
  test('A página deve conter um texto <name> Details.', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);

    fireEvent.click(details);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação para os detalhes do Pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const Linkdetails = getByText(/More details/i);

    fireEvent.click(Linkdetails);
    expect(Linkdetails).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText(/More details/i);

    fireEvent.click(details);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();

    expect(getByRole('heading', {
      name: 'Summary',
      level: 2,
    }));
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);

    fireEvent.click(details);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(getByText(`${pokemons[0].summary}`)).toBeInTheDocument();
  });
});

describe('Teste se existe na página os mapas contendo as localizações', () => {
  test('Na seção de detalhes deve existir um h2 escrito Game Locations...', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText(/More details/i);

    fireEvent.click(details);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();

    expect(getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
      level: 2,
    }));
  });

  test('Todas as localizações devem ser mostradas na seção de detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);

    fireEvent.click(details);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();

    pokemons[0].foundAt.map(
      (pokemon) => expect(getByText(pokemon.location)).toBeInTheDocument()
    );
  });

  test('Devem ser exibidos, o nome da localização e uma imagem do mapa', () => {

  });

  test('A imagem da localização deve ter um atributo src com a URL', () => {

  });

  test('A imagem da localização deve ter um atributo alt com o texto', () => {

  });
});

describe('Teste se o usuário pode favoritar um pokémon pela página de detalhes', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);

    fireEvent.click(details);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();

    const favorito = getByLabelText(/Pokémon favoritado?/i);
    const button = fireEvent.click(favorito);
    expect(button).toBeTruthy();
  });

  test('Cliques alternados no checkbox devem adicionar e remover o Pokémon', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);

    fireEvent.click(details);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();

    const favorite = getByLabelText(/Pokémon favoritado?/i);
    fireEvent.change(favorite, { target: { checked: !favorite.checked } });
    expect(favorite.checked).toBeFalsy();
    fireEvent.change(favorite, { target: { checked: !favorite.checked } });
    expect(favorite.checked).toBeTruthy();
  });
});
