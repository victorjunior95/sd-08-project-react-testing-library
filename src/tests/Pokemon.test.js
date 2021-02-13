import React from 'react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

const testIds = {
  name: 'pokemon-name',
  type: 'pokemonType',
  weight: 'pokemon-weight',
};

const pokemonTest = data[0];

const renderPokemon = ({ pokemon = pokemonTest, showDetailsLink, isFavorite } = {}) => (
  renderWithRouter(<Pokemon { ...{ pokemon, showDetailsLink, isFavorite } } />)
);

describe('requirement06', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderPokemon();
    const { name, type, averageWeight: { value, measurementUnit } } = pokemonTest;
    expect(getByTestId(testIds.name).textContent).toBe(name);
    expect(getByTestId(testIds.type).textContent).toBe(type);
    expect(getByTestId(testIds.weight).textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(getByAltText(`${name} sprite`).src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Teste se o card do Pokémon indicado na Pokédex 
  contém um link de navegação para exibir detalhes deste Pokémon`, () => {
    const { getByRole } = renderPokemon({ showDetailsLink: true });
    const { id } = pokemonTest;
    expect(getByRole('link', { name: 'More details' }).pathname).toBe(`/pokemons/${id}`);
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, 
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { getByRole, history } = renderPokemon({ showDetailsLink: true });
    const { id } = pokemonTest;
    expect(history.location.pathname).toBe('/');
    userEvent.click(getByRole('link', { name: 'More details' }));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderPokemon({ isFavorite: true });
    const { name } = pokemonTest;
    const icon = getByAltText(`${name} is marked as favorite`);
    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain('/star-icon.svg');
  });
});
