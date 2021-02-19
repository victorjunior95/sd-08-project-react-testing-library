import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('req02 Teste e a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const headingH2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
});
test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const paragraph = screen.getByText(/One can filter Pokémons by type, and see more details for each one of them/i);
  expect(paragraph).toBeInTheDocument();
});
test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const imgLink = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const img = screen.getByAltText(/Pokédex/i);
  expect(img.src).toBe(imgLink);
});
