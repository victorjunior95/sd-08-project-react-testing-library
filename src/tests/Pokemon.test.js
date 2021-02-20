import React from 'react';
import { screen, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Pokemon from '../components/Pokemon';
// import Data from '../data';

const PokemonStandart = ({ averageWeight: { measurementUnit: 'unit', value: '1000' },
  id: 10,
  image: 'PokemonImage',
  name: 'PokemonName',
  type: 'PokemonType' });

describe('Pokemon.js ', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ PokemonStandart } showDetailsLink isFavorite />
      </Router>,
    );
    const PokemonName = screen.getByText('PokemonName');
    expect(PokemonName).toBeInTheDocument();
  });
  test('O tipo correto do pokémon deve ser mostrado na tela;', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ PokemonStandart } showDetailsLink isFavorite />
      </Router>,
    );
    const PokemonType = screen.getByText('PokemonType');
    expect(PokemonType).toBeInTheDocument();
  });
  test('O peso médio do pokémon deve ser exibido;', () => {
    const history = createMemoryHistory();
    const P = PokemonStandart;
    render(
      <Router history={ history }>
        <Pokemon pokemon={ PokemonStandart } showDetailsLink isFavorite />
      </Router>,
    );
    const PokemonWeight = screen.getByTestId('pokemon-weight');
    // console.log(PokemonWeight);
    expect(PokemonWeight).toHaveTextContent(
      `Average weight: ${P.averageWeight.value} ${P.averageWeight.measurementUnit}`,
    );
    expect(PokemonWeight).toBeInTheDocument();
  });
  test('A imagem do Pokémon deve ser exibida;', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ PokemonStandart } showDetailsLink isFavorite />
      </Router>,
    );
    const PokemonImage = screen.getAllByRole('img');
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(PokemonImage[0]).toHaveAttribute('src', 'PokemonImage');
    expect(PokemonImage[0]).toHaveAttribute('alt', 'PokemonName sprite');
    expect(PokemonImage[0]).toBeInTheDocument();
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link;', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ PokemonStandart } showDetailsLink isFavorite />
      </Router>,
    );
    // https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
    const PokemonLink = screen.getByText('More details');
    expect(PokemonLink.closest('a')).toHaveAttribute(
      'href', `/pokemons/${PokemonStandart.id}`,
    );
    expect(PokemonLink.closest('a')).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados;', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ PokemonStandart } showDetailsLink isFavorite />
      </Router>,
    );
    const PokemonImageIcon = screen.getAllByRole('img');
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(PokemonImageIcon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(PokemonImageIcon[1]).toHaveAttribute('alt',
      'PokemonName is marked as favorite');
    expect(PokemonImageIcon[1]).toBeInTheDocument();
  });
});
