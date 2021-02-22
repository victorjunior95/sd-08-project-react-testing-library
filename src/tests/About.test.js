import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

it('Check if contains de Pokedex info', () => {
  const { getByRole } = renderWithRouter(<About />);
  const aboutAll = getByRole('heading', { level: 2 });
  expect(aboutAll).toBeInTheDocument();
  expect(aboutAll).toHaveTextContent('About Pokédex');
});

it('Check if contains a Pokedex image', () => {
  const pokedexImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img', { name: /pokédex/i });
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(pokedexImage);
});
