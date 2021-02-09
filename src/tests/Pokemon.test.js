import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  const card = pokemons[7];
  const { getByText, getByAltText } = renderWithRouter(
    <Pokemon pokemon={ card } isFavorite={ {} } />,
  );

  const name = 'Snorlax';
  expect(getByText(card.name).textContent).toBe(name);

  const type = 'Normal';
  expect(getByText(card.type).textContent).toBe(type);
  const averageWeightValue = card.averageWeight.value;
  const averageWeightUnit = card.averageWeight.measurementUnit;
  const weight = getByText(`Average weight: ${averageWeightValue} ${averageWeightUnit}`);
  const weightData = 'Average weight: 460.0 kg';
  expect(weight.textContent).toBe(weightData);
  const srcImageData = 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png';
  const altImageData = getByAltText('Snorlax sprite');
  expect(altImageData.src).toBe(srcImageData);
});

test('Teste se o card do Pokémon contém um link para exibir detalhes deste Pokémon.'
+ 'O link deve ser /pokemons/<id>, onde <id> é o id do Pokémon exibido;', () => {
  const card = pokemons[7];
  const { getByText } = renderWithRouter(
    <Pokemon pokemon={ card } isFavorite={ {} } />,
  );

  const details = getByText('More details');
  expect(details.href).toContain('/pokemons/143');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const card = pokemons[7];
  const { getByAltText } = renderWithRouter(
    <Pokemon pokemon={ card } isFavorite={ {} } />,
  );

  const star = getByAltText('Snorlax is marked as favorite');
  expect(star.src).toContain('/star-icon.svg');
});

// https://jestjs.io/docs/en/expect#tocontainitem
// Os dois últimos strykes ( teste linha 27 e teste linha 38) foram adaptados á partir do trabalho de Izelda.
// https://github.com/tryber/sd-07-project-react-testing-library/pull/138/
