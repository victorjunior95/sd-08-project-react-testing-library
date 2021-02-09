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
  const srcImageData = 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png';
  const altImageData = getByAltText('Snorlax sprite');
  expect(altImageData.src).toBe(srcImageData);
});

// test('Teste se o card do Pokémon contém um link para exibir detalhes deste Pokémon.'
// + 'O link deve ser /pokemons/<id>, onde <id> é o id do Pokémon exibido;', () => {
//   const card = pokemons[7];
//   const { getElementById } = renderWithRouter(
//     <Pokemon pokemon={ card } isFavorite={ {} } />,
//   );

//   const id = 143;
//   expect(getElementById(card)).toBe(id);
// });
