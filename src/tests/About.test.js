import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const heading = getByText(/about pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const heading = getByRole('heading', { level: 2, name: /about pokédex/i });
  expect(heading).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const getParagraphs = container.querySelectorAll('p');
  expect(getParagraphs.length).toBe(2);
});

test('Teste se a página contém a imagem de uma Pokédex:', () => {
  const { getByRole } = renderWithRouter(<About />);
  const getImage = getByRole('img');
  const urlImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(getImage.src).toBe(urlImage);
});
