import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const btnDetails = 'More details';
const numberImg = 3;

describe('Teste se as inf. detail do Pokémon selecionada são mostradas na tela.', () => {
  test('se pag  contem `<name> Details`, onde `<name>` é o nome do Pokémon;', () => {
    const { getByText } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const heading = getByText(/Pikachu Details/i);
    expect(heading).toBeInTheDocument();
  });
  test('se Não existir o link de naveg para os detalhes do Pokémon selected.', () => {
    const { getByText } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const paragraph2 = getByText(/with electricity to make them tender enough to eat./i);
    expect(paragraph2).toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um heading `h2` com o texto `Summary`.', () => {
    const { getByText } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const selectHead = getByText('Summary');
    expect(selectHead).toBeInTheDocument();
  });
  test('Se contem um parágrafo com o resumo do Pokémon específico.', () => {
    const { getByText } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const selectHead = getByText(/this intelligent Pokémon roasts hard berries/i);
    expect(selectHead).toBeInTheDocument();
  });
});
describe('se existe na página uma seção com os contendo mapas ', () => {
  test('existir um heading `h2` com o texto `Game Locations of <name>`;.', () => {
    const { getByText } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const selectHead = getByText(/Game Locations of Pikachu/i);
    expect(selectHead).toBeInTheDocument();
  });
  test('se é exibido o nome da localização e uma img do mapa em cada localização', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const selectHead = getByText('Game Locations of Pikachu');
    expect(selectHead).toBeInTheDocument();
    const img = getAllByRole('img');
    expect(img.length).toBe(numberImg);
  });
  test('Se alocalização deve ter um atributo `src` com a URL da localização', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const img = getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Se a localização deve ter um atributo `alt` com o texto', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const img = getAllByRole('img');
    expect(img[1]).toHaveAttribute('Alt', 'Pikachu location');
    expect(img[2]).toHaveAttribute('Alt', 'Pikachu location');
  });
});
describe('Teste se o usuário pode favoritar um pokémon na página de detalhes.', () => {
  test('Se a página exibi um `checkbox` que permite favoritar o Pokémon;', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const PokemonFavorite = getByRole('checkbox');
    expect(PokemonFavorite).toBeInTheDocument();
  });
  test('Se a página exibi um `checkbox` que permite favoritar o Pokémon;', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const textLink = getByText(btnDetails);
    fireEvent.click(textLink);
    const label = getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
  });
});
