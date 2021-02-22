import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helper/renderWithRouter';

it('Teste se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const textAbout = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/,
  });
  const paragraphs = screen.getAllByTestId('paragraph-about').length;
  const pokedexImg = screen.getByTestId('image-pokedex-about');
  const pokedexImgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(textAbout).toBeInTheDocument();
  expect(paragraphs).toBe(2);
  expect(pokedexImg.src).toBe(pokedexImgSrc);
});
