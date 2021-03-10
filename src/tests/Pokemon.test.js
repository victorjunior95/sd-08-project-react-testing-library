import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

const mockedPokemon = pokemons[0];
const { id, name } = mockedPokemon;

describe('Teste se é renderizado um card com as inf. de determinado pokémon.', () => {
  test('se nome correto do Pokémon deve ser mostrado na tela;', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonName = getByText(pokemons[0].name);
    expect(pokemonName).toBeInTheDocument();
  });
  test('Se o tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemonType').textContent).toBe(pokemons[0].type);
  });
  test('Se o peso médio do pokémon deve ser exibido', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const { value, measurementUnit } = pokemons;
    const averageWeight = getByTestId('pokemon-weight');
    const textAverageWeight = `Average weight: ${value} ${measurementUnit}`;
    expect(averageWeight).toBeInTheDocument(textAverageWeight);
  });
  test('Se a imagem do Pokémon deve ser exibida corretamente', () => {
    const { getByAltText } = renderWithRouter(<App />);
    expect(getByAltText(`${pokemons[0].name} sprite`).src).toBe(pokemons[0].image);
  });
});
describe('Se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  test('se ao clicar no link correto é feito o redirect a pág de detalhes. ', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      isFavorite
      pokemon={ mockedPokemon }
    />);
    const linkDetails = getByRole('link');
    expect(linkDetails.href).toBe(`http://localhost/pokemons/${id}`);
  });

  test('se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test('Se a uma imagem com o atributo `src` contem o caminho `/star-icon.svg`', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mockedPokemon }
      />,
    );
    const img = getByAltText(`${name} is marked as favorite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('http://localhost/star-icon.svg');
  });
});
