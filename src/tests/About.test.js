import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const text = getByText('This application simulates a Pokédex,'
  + ' a digital encliclopedia containing all Pokémons');
  expect(text).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const aboutPokedexText = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });

  expect(aboutPokedexText).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const pokedexText1 = screen.getByText('This application simulates a Pokédex,'
  + ' a digital encliclopedia containing all Pokémons');
  const pokedexText2 = screen.getByText('One can filter Pokémons by type,'
  + ' and see more details for each one of them');

  expect(pokedexText1).toBeInTheDocument();
  expect(pokedexText2).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
