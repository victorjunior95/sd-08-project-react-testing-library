import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('Verifica a existencia da seção about dentro de um H2', () => {
  renderWithRouter(<About />);
  const aboutPokemon = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(aboutPokemon).toBeInTheDocument();
});

test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
  expect(paragraphOne).toBeInTheDocument();

  const paragraphTwo = screen.getByText(/One can filter Pokémons by type/i);
  expect(paragraphTwo).toBeInTheDocument();
});

test('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const image = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const img = screen.getByRole('img');
  expect(img.src).toBe(image);
});
