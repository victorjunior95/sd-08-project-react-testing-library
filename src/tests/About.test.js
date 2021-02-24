import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helper/renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { container } = renderWithRouter(<About />);
  const textAbout = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/,
  });
  const paragraphs = container.querySelectorAll('p').length;
  const pokedexImg = container.querySelector('img').src;
  const pokedexImgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(textAbout).toBeInTheDocument();
  expect(paragraphs).toBe(2);
  expect(pokedexImg).toBe(pokedexImgSrc);
});
