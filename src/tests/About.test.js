import React from 'react';
// import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { getByRole } = render(<About />);
  const info = getByRole('heading', {
    level: 2,
  });
  expect(info).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  const { getByRole } = render(<About />);
  const info = getByRole('heading', {
    level: 2,
  });
  expect(info.textContent).toBe('About Pokédex');
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { getByText } = render(<About />);
  const textOne = /This application simulates a Pokédex/i;
  const paragraphOne = getByText(textOne);
  expect(paragraphOne).toBeInTheDocument();
  const textTwo = /One can filter Pokémons by type/i;
  const paragraphTwo = getByText(textTwo);
  expect(paragraphTwo).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  const SRC = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const { getByRole } = render(<About />);
  const imagemPokedex = getByRole('img');
  expect(imagemPokedex.src).toBe(SRC);
});
